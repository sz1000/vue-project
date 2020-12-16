from fabric.contrib.project import rsync_project
from fabric.api import *
import platform
import os
import re
import sys
import pyperclip
#231231321aa
env.user = 'root'
env.password = '-X]^vp>#Vw,nvk_K'
env.hosts = ['212.64.43.166']
env.port = 56667
sshPortBaseNum = 50000
phpPath = '/data/www/'

projects = {'front':
    [
        'vstcom-frontend'
    ],
    'backend':
        [
            'vstcom-php-backend',
            'vstsa-php-backend'
        ]
}

proType = 'front'
project = projects[proType][0]


def test():
    run('echo 111')


def ssh(num):
    dockerPort = sshPortBaseNum + int(num)
    local('ssh -p %s root@%s' %(dockerPort, env.hosts[0]))


def exec(num, cmd, path=phpPath + project):
    run('docker exec vir%s bash -c "cd %s && %s"' % (num, path, cmd))


def getLocalPath():
    filePath = os.path.abspath(__file__)

    # 取出盘符
    localRoot = filePath[0:1]
    localRoot = localRoot.lower()
    # 去掉盘符
    localPath = filePath[2:]
    localPath = localPath.replace('\\', '/')
    localPath = '/cygdrive/' + localRoot + localPath
    # 去掉 fabfile.py
    localPath = localPath[:-11]

    if (proType == 'front'):
        localPath = localPath + '/dist/'
    return localPath


def getRemotePath(num):
    remotePath = ''
    if (proType == 'front'):
        remotePath = '/data' + str(num) + '/front/' + project + '/'

    elif (proType == 'backend'):
        remotePath = '/data' + str(num) + '/www/'
    return remotePath


# 部署前的准备工作
def prepare():
    if (proType == 'backend'):
        return
    elif (proType == 'front'):
        build()


def build():
    local('npm run build')


def deploy(num, exclude=('vendor', 'storage', '.git', '.env')):
    localPath = getLocalPath()
    remotePath = getRemotePath(num)

    prepare()
    pyperclip.copy(str(env.password))
    rsync_project(local_dir=localPath, remote_dir=remotePath, delete=True, exclude=exclude)

    run('mkdir -p /data1/front/vstcom-frontend/admin')
    run('mv /data1/front/vstcom-frontend/index.html /data1/front/vstcom-frontend/admin')
    run('mv /data1/front/vstcom-frontend/favicon.ico /data1/front/vstcom-frontend/admin')
    run('chmod -R 777 /data1/')


def migrate(num):
    exec(num, 'php artisan migrate')


def seed(num):
    exec(num, 'php artisan db:seed')


def pushEnv(num):
    envPath = '/data' + str(num) + '/www/' + project + '/.env'
    put('./.env/beta%s.env' % num, envPath)


def pullEnv(num):
    envPath = '/data' + str(num) + '/www/' + project + '/.env'
    get(envPath, './.env/beta%s.env' % num)

#开启队列任务
def startQueue(num):
    run('docker exec vir%s bash -c "supervisord "' % num)
    run('docker exec vir%s bash -c "supervisorctl start vst-work:* "' % num)
    run('docker exec vir%s bash -c "supervisorctl start matrix-work:* "' % num)

#启动redis
def startRedis(num):
    run('docker exec vir%s bash -c "/usr/local/redis/src/redis-server /usr/local/redis/redis.conf "' % num)

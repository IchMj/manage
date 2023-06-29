FROM harbor.dengbao.cloud/dengbao-dev/nginx-ansible:v0.1
COPY ./dist /usr/share/nginx/ansible

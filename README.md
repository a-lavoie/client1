# client1
Live website demo

# Integrate new team member
>git clone...
>cd public
>bower install --save

>cd ..

# Common helper commands (on Ubuntu 14.04)
>  sudo netstat -lpn | grep 8080   # Find process listen to a port


> mongod
> Recommended to run as a normal user.
> /usr/bin/mongod --dbpath /home/alainlavoie/WebstormProjects/client1/data
> mongo
mongo> show dbs
mongo> use client1
mongo> show collections
... 
usercollection
...
mongo> db.usercollection.find();
mongo> db.landcollection.find();
mongo> 

sudo ln -s /home/alainlavoie/WebstormProjects/client1/server/nginx/nginx.conf  /etc/nginx/nginx.conf

Searching for a port already in used
sudo netstat -lpn
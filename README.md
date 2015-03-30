# client1
Live website demo

# Integrate new team member
>git clone...
>cd public
>bower install --save

>cd ..

# Common helper commands (on Ubuntu 14.04)
>  sudo netstat -lpn | grep 8080   # Find process listen to a port

In js:

p.directive("customDirective", function(){
   return {
      template: "<a...>",
      replace: false, // (default)
   
   };
});

In HTML

<custom-directive></custom-directive>  
// ou <div custom-directive></div> 

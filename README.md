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
      // ou templateUrl: 'directives/customdirective.html'
      replace: false, // (default)
      restrict: '', // default E: Element + A: Attribute, ... C: Class, M: Comment ou combiné 
      // default (scope) hérité du controller parent, sinon pour l'isoler on fait 
      scope: {   // Permettra de faire du mapping entre le scope du controlleur parent et celui de la directive
         personName: "@"  // Text mapping for an attribute defined person-name in tag; action d'interpoler
         '': 
         '': 
         '': 
         
      } 
   };
});

In HTML

<custom-directive></custom-directive>  --> remplacer par fichier customdirective.html
// ou <div custom-directive></div> 
// 
<custom-directive person-name='person.name'></custom-directive>

Fichier customdirective.html
<a ...

   {{ personName }}

/a>


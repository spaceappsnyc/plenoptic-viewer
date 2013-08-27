/**
* Renders the plenoptic image
*/
Application.Directives.directive('renderer', ['configuration', function (configuration) {
    'use strict';
    return {
        restrict : 'A',
        link : function (scope, element, attrs) {

            var render, animate, depthMap, scene, camera, renderer, geometry, material, shape, dimensions, leftButtonDown, previousMouseEvent;


            element.bind('mousemove', function (event) {
                var deltaX, deltaY;

                if (shape && leftButtonDown) {
                    previousMouseEvent = previousMouseEvent || event;
                    deltaX = event.x - previousMouseEvent.x;
                    deltaY = event.y - previousMouseEvent.y;
                    shape.rotation.y -= deltaX * 0.001;
                    shape.rotation.x -= deltaY * 0.001;
                    previousMouseEvent = event;
                    console.log(deltaX);
                }
            });

            element.bind('mousedown', function (event) {
                leftButtonDown = event.which === 1;
                previousMouseEvent = undefined;
                console.log(event);
            });

            element.bind('mouseup', function (event) {
                leftButtonDown = false;
                console.log(event);
            });

            render = function () {
                dimensions = Math.sqrt(depthMap.length);

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                renderer = new THREE.WebGLRenderer();
                geometry = new THREE.PlaneGeometry(dimensions, dimensions, dimensions - 1, dimensions - 1);

                material = new THREE.MeshBasicMaterial({
                    //color: 0xFF0000,
                    map : THREE.ImageUtils.loadTexture(configuration.DATA_URL + 'IMG_0011-stk_00.jpg')
                    //wireframe : true
                });

                //draw verticies
                for (var i = 0; i < geometry.vertices.length; i++){
                    geometry.vertices[i].z = depthMap[i] * -1;  
                }

                shape = new THREE.Mesh(geometry, material);
                shape.doubleSided = true;
                shape.overdraw = true;

                scene.add(shape);

                camera.position.z = configuration.RENDERER_CAMERA_Z;
                renderer.setClearColor(0x00000, 1);
                renderer.setSize( window.innerWidth, window.innerHeight);

                renderer.render(scene, camera);

                element[0].appendChild(renderer.domElement);
                (function render () {
                    //shape.rotation.x += .001;
                    //shape.rotation.y += .01;

                    renderer.render(scene, camera);

                    requestAnimationFrame(render);
                })();
            }

            scope.depthMap.then(function (result) {
                depthMap = result;
                render();
            });


        }
    };
}]);
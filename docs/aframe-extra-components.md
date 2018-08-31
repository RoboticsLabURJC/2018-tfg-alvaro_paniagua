# AFRAME extra components

This file explains the extra AFRAME components added to the framework.

## Spectator

This component is a extension from the original component developed by David Erickson @derickson , can see the code [here](https://gist.github.com/derickson/334a48eb1f53f6891c59a2c137c180fa).

Extra functionality:

  - Added a second camera `#camera2` which content is the 2d representation for the spectator camera.

***

## Follow body

This component is used to link a raycaster entity to other entity using the id, example: `#a-pibot` ,without
inheriting the `dynamic-body` properties.

Properties:

| Property | Description | Default value | Type |
| :------: | :---------: | :-----------: | :--: |
| entityId | Identificator for the entity to link to. | null | String |


Usage:

  ~~~
    <a-entity follow-body:"entityId:myEntityId"></a-entity>
  ~~~

## Intersection Handler

This component is used to manage the *raycaster-intersection* and *raycaster-intersection-cleared* event, it's main use is to capture the distance between the robot which raycaster is linked to by *follow-body* component and the entity intersecting with raycaster.
It fires up a custom event called *intersection-detected* and passes distance to the object as argument.

Properties:

| Property | Description | Default value | Type |
| :------: | :---------: | :-----------: | :--: |
| fps | Number used to throttle or slower the event firing | 15 | Number |


Usage:

  ~~~
    <a-entity intersection-handler:"fps: 10"></a-entity>
  ~~~

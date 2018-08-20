# AFRAME extra components

This file explains the extra AFRAME components added to the framework.

## Spectator

This component is a extension from the original component developed by David Erickson @derickson , can see the code [here](https://gist.github.com/derickson/334a48eb1f53f6891c59a2c137c180fa).

Extra functionality:

  - Added a second camera `#camera2` which content is the 2d representation for the spectator camera.

***

## Follow body

This component is used to link a raycaster entity to other entity `#a-pibot` without inheriting the `dynamic-body` properties.

Properties:

| Property | Description | Default value | Type |
| :------: | :---------: | :-----------: | :--: |
| entityId | Identificator for the entity to link to.| null | String |


Usage:

  ~~~
    <a-entity follow-body:"entityId:myEntityId"></a-entity>
  ~~~

/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Graydon Ezzeddin
// Created on: June 2023
// This is the Phaser3 configuration file

//Import files
import SplashScene from './splashScene.js' 

// adding game scenes cobsr
const splashScene = new SplashScene() 

// Game Scene
const config = {
  type:  Phaser.AUTO, 
  width: 1920,
  height: 1080, 
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
// Set Background Colour
  backgroundColor: 0x5f6e7a,
    scale: {
    mode: Phaser.Scale.FIT,
    // place it in middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}


const game = new Phaser.Game(config) 

// Adding game scenes
game.scene.add('splashScene', splashScene)
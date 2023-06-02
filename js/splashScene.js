/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Graydon Ezzeddin
// Created on: June 2023
// This is the title scene


// Extending Scene
class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene' })
  }

  // Set Background colour
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Load in Splash Scene file
  preload () {
    console.log('Splash Scene')
    this.load.image('splashSceneBackground', './assets/splashscene.jpeg')
  }

  // Place Image and Center it
  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  update (time, delta) {
    if (time > 3000) {
      this.scene.switch('titleScene')
    }
  }
}

export default SplashScene 


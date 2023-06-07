/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// Modified by: Graydon Ezzeddin
// This is the Splash Scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene' })

    this.splashSceneBackgroundImage = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#000080')
  }

  preload () {
    console.log('Splash Scene')
    //images 
    this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
  }

  create (data) {
    //Load background
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground').setScale(2.4)
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  update (time, delta) {
    //Switch scenes after a certain time
    if (time > 3000) {
      this.scene.switch('titleScene')
    }
  }
}

export default SplashScene

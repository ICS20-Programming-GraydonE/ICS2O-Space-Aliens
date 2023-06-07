/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// Modified by: Graydon Ezzeddin
// This is the title scene Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })

    this.splashSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '100px Times', fill: '#FF0000', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Title Scene')
    this.load.image('titleSceneBackground', './assets/titlesceneimage.png')
  }

  create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.5)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'By: Graydon Ezzeddin', this.titleSceneTextStyle).setOrigin(0.5)
  }

  update (time, delta) {
    if (time > 5000) {
      this.scene.switch('menuScene')
    }
  }
}


export default TitleScene

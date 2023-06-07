/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// Modified by: Graydon Ezzeddin
// This is the Game Scene

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'gameScene' })

    this.background= null
    this.ship= null
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Game Scene')
    //images
    this.load.image('articBackground', './assets/articBackground.png')
    this.load.image('ship', './assets/seal.png')
  }

  create (data) {
    this.background = this.add.image(0, 0, 'articBackground').setScale(2.0)
    this.background.setOrigin(0, 0)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.5)
  }

  update (time, delta) {
    }
  }


export default GameScene

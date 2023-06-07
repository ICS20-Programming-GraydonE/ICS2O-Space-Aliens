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
    this.fireMissile = false
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Game Scene')
    //images
    this.load.image('articBackground', './assets/articBackground.png')
    this.load.image('ship', './assets/seal.png')
    this.load.image('missile', './assets/laser.png') 
  }

  create (data) {
    // add background
    this.background = this.add.image(0, 0, 'articBackground').setScale(2.0)
    this.background.setOrigin(0, 0)
    // add seal 
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.5)
  
    // Create group for lasers
  this.missileGroup = this.physics.add.group()
  }
  

  update (time, delta) {
    //Add controls
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    
    // Seal can go left
    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) { // Seal wraps back around
        this.ship.x = 1920
      }
    }
    // Seal can move right
    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) { // Ship wraps back around
        this.ship.x = 0  
      }
    }

    // Seal can shoot lasers
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.1)
        this.missileGroup.add(aNewMissile)
      }
    }
    
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    
  }
}


export default GameScene

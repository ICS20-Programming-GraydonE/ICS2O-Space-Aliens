/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// Modified by: Graydon Ezzeddin
// This is the Menu Scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton = null
    this.menuSceneText = null
    this.menuSceneTextStyle = { font: '10px Times', fill: '#FF0000', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Menu Scene')
    //images for background 
    this.load.image('menuSceneBackground', './assets/menusceneimage.jpg')
    // images for buttons
    this.load.image('startButton', './assets/startbutton.png')
    this.load.image('instructionButton', './assets/instructionbutton.png')
  }

  create (data) {
    // Add background
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(3.5)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2
    // Add button to start
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
    // Add button to see instructions
    this.instructionButton = this.add.sprite(1920 / 2, (1080 / 2) + 350, 'instructionButton')
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.clickInstruction())
    }
  
  update (time, delta) {
  }

// button to start instructions menu
  clickInstruction () {
    this.scene.start('instructionScene')
  }
  
// Button to start game
  clickButton () {
    this.scene.start('gameScene')
  }
  
}
  


export default MenuScene

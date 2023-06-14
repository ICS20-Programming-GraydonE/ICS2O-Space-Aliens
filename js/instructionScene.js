/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// Modified by: Graydon Ezzeddin
// This is the instructions scene

class InstructionScene extends Phaser.Scene {
  constructor () {
    super({ key: 'instructionScene' })

    this.instructionSceneBackgroundImage = null
    this.menuButton = null
    this.instructionSceneText = null
    this.instructionSceneTextStyle = { font: '100px Times', fill: '#00FFFF', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Instruction Scene')
    //images for background and button
    this.load.image('instructionSceneBackground', './assets/instructionbackground.jpg')
    this.load.image('menuButton', './assets/menubutton.png')
  }

  create (data) {
    // Add background
    this.instructionSceneBackgroundImage = this.add.sprite(0, 0, 'instructionSceneBackground').setScale(3.5)
    this.instructionSceneBackgroundImage.x = 1920 / 2
    this.instructionSceneBackgroundImage.y = 1080 / 2
    // Add button
    this.backButton = this.add.sprite(1920 / 2, (1080 / 2) + 50, 'menuButton')
    this.backButton.setInteractive({ useHandCursor: true })
    this.backButton.on('pointerdown', () => this.goBack())

    // Instructions
    this.instructionSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Use the left and right arrow keys or A and D to move left and right. \n Click the Space Bar to shoot. Gain points by shooting the polar bears. \nBut watch out! if you are hit by a polar bear, you lose.', this.instructionSceneTextStyle).setOrigin(0.5).setScale(0.5)
  }

  update (time, delta) {
  }

  goBack () {
    this.scene.start('menuScene')
  }
}
  
export default InstructionScene

/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Graydon Ezzeddin
// Created on: June 2023
// This is the title scene


// Extending Scene
class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })
  }

  // Set Background colour
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  //
  preload () {
    console.log('Title Scene')
  }

  create (data) {
  }

  update (time, delta) {
  }
}

export default TitleScene

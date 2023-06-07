/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// Modified by: Graydon Ezzeddin
// This is the instructions scene

class InstructionsScene extends Phaser.Scene {
  constructor () {
    super({ key: 'instructionsScene' })

  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Instructions Scene')
  }

  create (data) {
  }

  update (time, delta) {
    }
  }


export default GameScene

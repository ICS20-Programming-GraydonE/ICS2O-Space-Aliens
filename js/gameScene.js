/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// Modified by: Graydon Ezzeddin
// This is the Game Scene

class GameScene extends Phaser.Scene {
  // create a polar bear
  createPolar() {
    // this will get a number between 1 and 1920
    const polarXLocation = Math.floor(Math.random() * 1920) + 1
    // this will get a number between 1 and 50
    let polarXVelocity = Math.floor(Math.random() * 50) + 1
    // this will add minus sign in 50% of cases
    polarXVelocity *= Math.round(Math.random()) ? 1 : -1
    const aPolar = this.physics.add.sprite(polarXLocation, -100, 'polar')
    aPolar.body.velocity.y = 200
    aPolar.body.velocity.x = polarXVelocity
    this.polarGroup.add(aPolar)
  }

  constructor() {
    super({ key: 'gameScene' })

    this.background = null
    this.ship = null
    this.fireMissile = false
    // Set score to zero
    this.score = 0
    // Set highscore to what is stored in the local storage or to 0 
    this.highScore = localStorage.getItem('highScore') || 0
    // Score text
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Verdana', fill: '#ffffff', align: 'center' }
    // High score text
    this.highScoreText = null;
    this.highScoreTextStyle = { font: '60px Verdana', fill: '#ffffff', align: 'center' }
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Game Scene')
    //images for all assets
    this.load.image('articBackground', './assets/articBackground.png')
    this.load.image('ship', './assets/seal.png')
    this.load.image('missile', './assets/laser.png')
    this.load.image('polar', './assets/polarbear.png')
    // sounds
    this.load.audio('laser', './sounds/lasersound.mp3')
    this.load.audio('polardeathsound', './sounds/polarbeardeath.mp3')
    this.load.audio('sealdeathsound', './sounds/sealdeath.mp3')
    this.load.audio('music', './sounds/gamescenemusic.mp3')
  }

  create(data) {
    // add background
    this.background = this.add.image(0, 0, 'articBackground').setScale(2.0)
    this.background.setOrigin(0, 0)


    //Music
    const song = this.sound.add('music');
    song.loop = true
    song.play()
    song.volume = 0.5
    
    // Add score
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    // add high score
    this.highScoreText = this.add.text(10, 100, 'High Score: ' + this.highScore.toString(), this.highScoreTextStyle);

    // add seal
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.5)

    // Create group for lasers
    this.missileGroup = this.physics.add.group()

    // Create group for Polar bears
    this.polarGroup = this.add.group()
    // Function to create polar bears
    this.createPolar()

    // Collisions between missiles and polar bears
    this.physics.add.collider(this.missileGroup, this.polarGroup, function(missileCollide, polarCollide) {
      polarCollide.destroy()
      missileCollide.destroy()
      // play sound
      this.sound.play('polardeathsound')
      // Add one to score and spawn two more polar bears
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createPolar()
      this.createPolar()
      // Check if the current score is higher than the high score (learned from: https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68)
      if (this.score > this.highScore) {
        this.highScore = this.score
        localStorage.setItem('highScore', this.highScore) // Save the new high score to localStorage
        this.highScoreText.setText('High Score: ' + this.highScore.toString())
      }
    }.bind(this))

    // Collisions between seal and polar bears
    this.physics.add.collider(this.ship, this.polarGroup, function(shipCollide, polarCollide) {
    // Disable the space bar
      const keySpaceObj = this.input.keyboard.addKey('SPACE')
      keySpaceObj.enabled = false 
      // Pause music and play death noise
      song.pause('music')
      this.sound.play('sealdeathsound')
      this.physics.pause()
      polarCollide.destroy()
      shipCollide.destroy()
      // Game over text
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5).setScale(5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
      // Reset score to 0 
      this.score = 0
    }.bind(this));

    // Creating a time to spawn seals if user does nothing 
    this.polarTimer = this.time.addEvent({
      delay: 5000,
      callback: this.createPolar,
      callbackScope: this,
      loop: true
    })

  }

  update(time, delta) {
    //Add controls
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keyAObj = this.input.keyboard.addKey('A');
    const keyDObj = this.input.keyboard.addKey('D');


    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    // Seal can go left using the arrow key
    if (keyLeftObj.isDown === true) {
      this.ship.setFlipX(false) 
      this.ship.x -= 15
      if (this.ship.x < 0) { // Seal wraps back around
        this.ship.x = 1920
      }
    }

    // Seal can go left using a
    if (keyAObj.isDown === true) {
      this.ship.setFlipX(false) 
      this.ship.x -= 15;
      if (this.ship.x < 0) { // Seal wraps back around
        this.ship.x = 1920;
      }
    }
    // Seal can move right using the arrow key 
    if (keyRightObj.isDown === true) {
      this.ship.setFlipX(true) 
      this.ship.x += 15
      if (this.ship.x > 1920) { // Ship wraps back around
        this.ship.x = 0
      }
    }

    // Seal can move right using the D key
    if (keyDObj.isDown === true) {
      this.ship.setFlipX(true) 
      this.ship.x += 15;
      if (this.ship.x > 1920) { // Ship wraps back around
        this.ship.x = 0;
      }
    }

    // Seal can shoot lasers
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.1)
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }
    // User can not hold down space bar to shoot, must click it every time
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
    // Destroys missiles when they hit the top of the scene
    this.missileGroup.children.each(function(item) {
      item.y = item.y - 15
      if (item.y < 50) {
        item.destroy()
      }
    })
  }
}

export default GameScene

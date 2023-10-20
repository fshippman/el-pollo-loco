class Character extends MovableObject {
    y = 140;
    x = 140;
    height = 290;
    width = 120;
    
   
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')  
        
    }
    //Constructur wird immer aufgerufen bei new
    jump(){

    }
}
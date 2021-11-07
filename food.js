class food
{
    constructor()
    {
    this.foodStock = 0;
    this.lastFeed;
    this.image = loadImage("Milk.png");
    //this.Image.addImage(this.image);
    } 

    updateFoodStock(foodStock)
    {
        this.foodStock = foodStock;
    }

    getFeedTime(lastFeed)
    {
        this.lastfeed = lastFeed;
    }

    detectFood()
    {
        if(this.foodStock > 0)
        {
            this.foodStock = foodStock - 1;
        }
        return this.foodStock;
    }
    getFoodStock()
    {   
        return this.foodStock;
    }

    display()
    {
        var x = 80,y = 100;
       // translate(this.body.position.x,this.body.position.y);
        imageMode(CENTER);
        //image(this.image,720,220,70,70);

        if(this.foodStock != 0)
        {
            for(var i=0; i<this.foodStock; i = i +1)
            {
                if(i%10 == 0)
                {
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x +30;
            }
        }
    }
}

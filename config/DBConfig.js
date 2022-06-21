"use strict";
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const sequelizeDB = new sequelize.Sequelize(
  "threadsintimes",
  "admin69",
  "password",
  {
    host: "localhost",
    dialect: "mysql",
    port:3306
  }
);

class User extends sequelize.Model {
  compareHash(val) {
    return bcrypt.compareSync(val, this.getDataValue("password"));
  }
}

User.init(
  {
    id: {
      type: sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,

    },
    name: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        return this.getDataValue("name").toUpperCase();
      },
    },
    email: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: sequelize.DataTypes.STRING(8),
      allowNull: true,
    },
    role: {
      type: sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: "C"
    },
    password: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10) + "";
        this.setDataValue("password", hash);
      },
    },
    updatedAt: {
      type: sequelize.DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DataTypes.DATE,
      allowNull: false,
    },
    MessagesCount: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    spools: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    sequelize: sequelizeDB,
    modelName: "user",
  }
);
class Ticket extends sequelize.Model{
    
}
Ticket.init({
  id:{type: sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    title: { type: sequelize.STRING,allowNull: false }, 
    description: { type: sequelize.STRING(2000),allowNull: false }, 
    pendingStatus: {type: sequelize.STRING,allowNull: false},
    urgency: {type:sequelize.STRING,allowNull: false},
    dateAdded: { type: sequelize.DATE,allowNull: false },
    posterURL: { type: sequelize.STRING }, 
    owner: {type: sequelize.STRING,allowNull: false},
    ownerID:{type: sequelize.INTEGER, allowNull:false}

},
  {
      freezeTableName: true,
      timestamps: true,
      sequelize: sequelizeDB,
      modelName: "ticket",
  }
)

class Feedback extends sequelize.Model{
    
}
Feedback.init({
    id:{type: sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    title: { type: sequelize.STRING,allowNull: false }, 
    description: { type: sequelize.STRING(2000),allowNull: false }, 
    rating: {type: sequelize.FLOAT,allowNull: false},
    remarks: {type:sequelize.STRING,allowNull: false},
    favouriteThing: {type:sequelize.STRING,allowNull: false},
    leastFavouriteThing: {type:sequelize.STRING,allowNull: false},
    dateAdded: { type: sequelize.DATE,allowNull: false },
    owner: {type: sequelize.STRING,allowNull: false},
    ownerID:{type: sequelize.INTEGER, allowNull:false}
},
    {
        freezeTableName: true,
        timestamps: true,
        sequelize: sequelizeDB,
        modelName: "feedback",
    }
)  
class FAQ extends sequelize.Model{
    
}

FAQ.init({
  id:{type: sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  title: { type: sequelize.STRING,allowNull: false }, 
  description: { type: sequelize.STRING(2000),allowNull: false }, 
  likes:{type:sequelize.INTEGER,allowNull:false,defaultValue:0},
  dateAdded: { type: sequelize.DATE,allowNull: false },
  owner: {type: sequelize.STRING,allowNull: false},
  ownerID:{type: sequelize.INTEGER, allowNull:false}
},
  {
      freezeTableName: true,
      timestamps: true,
      sequelize: sequelizeDB,
      modelName: "faq",
  }
)  

class Product extends sequelize.Model{

}
Product.init({
        sku:{type: sequelize.INTEGER, autoIncrement: false, primaryKey: true},
        name: { type: sequelize.STRING }, 
        description: { type: sequelize.STRING(2000) }, 
        price: { type: sequelize.FLOAT }, 
        quantity: {type: sequelize.INTEGER},
        category:{type:sequelize.STRING},
        Owner:{type:sequelize.STRING},
        OwnerID:{type: sequelize.INTEGER}
        
        
},
    {
        freezeTableName: true,
        timestamps: true,
        sequelize: sequelizeDB,
        modelName: "product",
    }
) 

class CartProduct extends sequelize.Model{

}
CartProduct.init({
        sku:{type: sequelize.INTEGER, autoIncrement: false, primaryKey: true},
        name: { type: sequelize.STRING }, 
        description: { type: sequelize.STRING(2000) }, 
        price: { type: sequelize.FLOAT }, 
        category:{type:sequelize.STRING},
        cartOwner:{type:sequelize.STRING},
        cartOwnerID:{type: sequelize.INTEGER},
        totalCost:{ type: sequelize.FLOAT },
        qtyPurchased:{ type: sequelize.INTEGER }
        
},
    {
        freezeTableName: true,
        timestamps: true,
        sequelize: sequelizeDB,
        modelName: "cartproduct",
    }
)  

class Message extends sequelize.Model{
    
}
Message.init({
    id:{type: sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    title: { type: sequelize.STRING,allowNull: false }, 
    description: { type: sequelize.STRING(2000),allowNull: false }, 
    dateAdded: { type: sequelize.DATE,allowNull: false },
    owner: {type: sequelize.STRING,allowNull: false},
    ownerID:{type: sequelize.INTEGER, allowNull:false},
    sender: {type: sequelize.STRING,allowNull: false},
    senderID:{type: sequelize.INTEGER, allowNull:false}
},
    {
        freezeTableName: true,
        timestamps: true,
        sequelize: sequelizeDB,
        modelName: "message",
    }
)

sequelizeDB
  .authenticate()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
User.sync({ alter: true })
  .then((v) => {
    console.log(v);
    console.log("Successfully altered and sync");
  })
  .catch((e) =>
    User.sync({ force: true }).then(() => {
      console.log(e);
      console.log("Created User table");
    })
  );
Ticket.sync({ alter: true })
  .then((v) => {
    console.log(v);
    console.log("Successfully altered and sync");
  })
  .catch((e) =>
    User.sync({ force: true }).then(() => {
      console.log(e);
      console.log("Created Ticket table");
    })
  );
Feedback.sync({ alter: true })
.then((v) => {
  console.log(v);
  console.log("Successfully altered and sync");
})
.catch((e) =>
  User.sync({ force: true }).then(() => {
    console.log(e);
    console.log("Created Feedback table");
  })
);
FAQ.sync({ alter: true })
.then((v) => {
  console.log(v);
  console.log("Successfully altered and sync");
})
.catch((e) =>
  User.sync({ force: true }).then(() => {
    console.log(e);
    console.log("Created FAQ table");
  })
);
Product.sync({ alter: true })
.then((v) => {
  console.log(v);
  console.log("Successfully altered and sync");
})
.catch((e) =>
  User.sync({ force: true }).then(() => {
    console.log(e);
    console.log("Created Product table");
  })
);

CartProduct.sync({ alter: true })
.then((v) => {
  console.log(v);
  console.log("Successfully altered and sync");
})
.catch((e) =>
  User.sync({ force: true }).then(() => {
    console.log(e);
    console.log("Created Product Cart table");
  })
);

Message.sync({ alter: true })
.then((v) => {
  console.log(v);
  console.log("Successfully altered and sync");
})
.catch((e) =>
  User.sync({ force: true }).then(() => {
    console.log(e);
    console.log("Created Message table");
  })
);
module.exports = sequelizeDB;

### Project Structure

+-------------------+          +---------------------+
|       User        |          |      Post           |
+-------------------+          +---------------------+
| UserID            |1      *  | PostID              |
| Username          |----------| Title               |
| Email             |          | Content             |  
| Password          |          | UserID (author)     |
+-------------------+          | CategoryID          |
                               | ViewsCount          |
                               | SharesCount         |
                               | LikesCount          |
                               | CommentsCount       |
                               | Timestamp           |
                               +---------------------+
                                     |
                                     |
                                     v
                               +---------------------+
                               |      Category       |
                               +---------------------+
                               | CategoryID          |
                               | Name                |
                               | Description         |
                               +---------------------+
                                     |
                                     |
                                     v
                               +---------------------+
                               |      Comment        |
                               +---------------------+
                               | CommentID           |
                               | PostID              |
                               | UserID (commenter)  |
                               | Text                |
                               | Timestamp           |
                               +---------------------+
                                     |
                                     |
                                     v
                               +---------------------+
                               |   Notification      |
                               +---------------------+
                               | NotificationID      |
                               | UserID (receiver)   |
                               | NotificationType   |
                               | Content             |
                               | Timestamp           |
                               +---------------------+


----------------------------------------------------------------

### .env file ####

## MONGO_URI = you mongodb database connection string
## PORT = 5000  (you can choose different port)
## JWT_SECRET= type a JWT secret string 
## JWT_LIFETIME= type a JWT lifetime

## GOOGLE_CLIENT_ID = your google account clientID
## GOOGLE_CLIENT_SECRET = your google account secret
## EMAIL_APP_PASSWORD = your email account password

## CLOUD_NAME = your cloudinary name
## CLOUD_API_KEY = your cloudinary key 
## CLOUD_API_SECRET = your cloudinary secret
{
    "version": 2,
    "builds":[
        {
            "src":"./index.js",
            "use":"@vercel/node"
        }
    ],
    "routes":[
        {
            "src":"/(./*)",
            "dest":"/"
        }
    ]
}
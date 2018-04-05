HabiTree is an application that allows habit tracking and a reward system based around growing a real world plant. It has an intricate backend and three ways to interface with your habits.

Manual interface: will consist of a 16x32 LED array and small LCD display. The LCD Display will be used to display the habits the user is tracking with the most recent streak (how many continuous days it's been done). The LED array will be used to display which days the habit has been done every month. Each time a habit is accomplished, it'll allow you to play a small minigame. A joystick will be used as input and all of this will be hooked up to a wifi-enabled arduino.

Web interface: will be a web application that allows you to create new habits, customize traits like whether they should be daily or weekly, and perhaps receive tips on staying consistent.

Voice interface: if we have time, we will implement an Amazon Echo Alexa skill that allows you to create new habits and mark them as accomplished through voice.

The Plant: the plant that you wish to grow from habits will have a small setup consisting of a water container and servo blocking a tube from the container into the soil. When a habit is accomplished, the servo will turn, allowing water to flow into the pot for a second, and then close. In this manner, the plant will only thrive if you maintain your habit streak.

Backend: although we originally planned to use dweet to interface between all the interfaces and the server, we will likely only use it for the manual interface. The Web interface will be using ExpressJS. The server will contain a JSON object for each user, each with an array of objects with the name of the habit and which days it has been accomplished.
/*
 * Created by Andrew Katchour with some code from https://www.arduino.cc/en/Tutorial/Sweep
 * The function of this code is to turn on a servo when needed.
 */
#include <Servo.h>

#define STARTSERVO 7

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo.write(180);
  delay(15);
  pinMode(STARTSERVO, INPUT);
}


void loop() {
   if (digitalRead(STARTSERVO) == HIGH)
   {
    myservo.write(0);
    delay(15);
   }
   else
   {
    myservo.write(180);
    delay(15);
   }

}

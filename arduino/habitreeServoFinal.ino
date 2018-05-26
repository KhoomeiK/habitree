/*
 * Created by Andrew Katchour with some code from https://www.arduino.cc/en/Tutorial/Sweep
 * The function of this code is to switch the emotion of the matrix on another arduino as
 * well as turning on a servo when needed.
 */
#include <Servo.h>

#define RESET 8
#define STARTSERVO 7

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo.write(0);
  delay(15);
  pinMode(RESET, OUTPUT);
  pinMode(STARTSERVO, INPUT);
}


void loop() {
   if (digitalRead(STARTSERVO) == HIGH)
   {
    digitalWrite(RESET, LOW);
    digitalWrite(9, HIGH);
    delay(15);
   }
   else
   {
    digitalWrite(RESET, HIGH);
    myservo.write(0);
    delay(15);
   }

}

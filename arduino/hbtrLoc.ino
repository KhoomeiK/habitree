//#include <ESP8266WiFi.h>
#include <Servo.h>

Servo myservo;
int pos = 25;

//int servo = 15;
//int led = 0;

//const char* ssid = "Guest";
//const char* password = "1234567890";
//
//const char* host = "www.dweet.io";
void setup() {
//  pinMode(servo, OUTPUT);
//  pinMode(led, OUTPUT);
  Serial.begin(115200);
  delay(100);

  myservo.attach(15);
  
//  Serial.print("Connecting to ");
//  Serial.println(ssid);
//  WiFi.begin(ssid, password);
//
//  while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    Serial.print(".");
//  }
//
//  Serial.println("");
//  Serial.println("WiFi connected");
//  Serial.println("IP address: ");
//  Serial.println(WiFi.localIP());
}

void loop() {
//  digitalWrite(servo, LOW);
//  Serial.print("connecting to ");
//  Serial.println(host);
//
//  WiFiClient client;
//  const int httpPort = 80;
//  if (!client.connect(host, httpPort)) {
//    Serial.println("connection failed");
//    return;
//  }
//
//  String url = "/get/latest/dweet/for/hbtr";
//  Serial.print("Requesting URL: ");
//  Serial.println(url);
//
//  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
//               "Host: " + host + "\r\n" +
//               "Connection: close\r\n\r\n");
//  delay(1000);
//
//  while (client.available()) {
//    String received = client.readString();
//    Serial.println(received);
//    String firstDivider = ":{";
//    String secondDivider = ":\"\"";
//    int firstDividerIndex = received.indexOf(firstDivider);
//    int secondDividerIndex = received.indexOf(secondDivider);
//    String line = received.substring(firstDividerIndex, secondDividerIndex);
//    line = line.substring(2);
//    Serial.println(line);
//    if (line.equals("\"open\"")) {
//      for (int i = 0; i < 100; i++) {
//        digitalWrite(servo, HIGH);
//        digitalWrite(servo, HIGH);
//        delay(1.5); // 50
//        digitalWrite(servo, LOW);
//        digitalWrite(servo, LOW);
//        delay(20);
//      }
//      for (int i = 0; i < 100; i++) {
//        digitalWrite(servo, HIGH);
//        digitalWrite(servo, HIGH);
//        delay(1.0); // 50
//        digitalWrite(servo, LOW);
//        digitalWrite(servo, LOW);
//        delay(20);
//      }
      // move servo 45 deg for 1 second
    }
  }

//  Serial.println("closing connection");
//  Serial.println();

  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }

  delay(3000);
}

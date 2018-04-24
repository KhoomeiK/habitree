#include <ESP8266WiFi.h>

int servo = 0; // 13

const char* ssid = "Rohan";
const char* password = "07092001";

const char* host = "www.dweet.io";
void setup() {
  pinMode(servo, OUTPUT);
  Serial.begin(115200);
  delay(100);
  
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  digitalWrite(servo, LOW);
  Serial.print("connecting to ");
  Serial.println(host);

  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  String url = "/get/latest/dweet/for/hbtr";
  Serial.print("Requesting URL: ");
  Serial.println(url);

  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");
  delay(1000);

  while (client.available()) {
    String received = client.readString();
    Serial.println(received);
    String firstDivider = ":{";
    String secondDivider = ":\"\"";
    int firstDividerIndex = received.indexOf(firstDivider);
    int secondDividerIndex = received.indexOf(secondDivider);
    String line = received.substring(firstDividerIndex, secondDividerIndex);
    line = line.substring(2);
    Serial.println(line);
    if (line.equals("\"open\"")) {
      for (int i = 0; i < 10; i++) {
        digitalWrite(servo, HIGH);
        delay(50); // 1.5
        digitalWrite(servo, LOW);
        delay(20);
      }
      // move servo 45 deg for 1 second then 
    }
  }

  Serial.println("closing connection");
  Serial.println();

  delay(1000);
}

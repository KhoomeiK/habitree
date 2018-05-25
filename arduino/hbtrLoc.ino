#include <ESP8266WiFi.h>

int servo = 15;
int led = 0;

const char* ssid = "Guest";
const char* password = "1234567890";

const char* host = "www.dweet.io";

void setup() {
  pinMode(servo, OUTPUT);
  pinMode(led, OUTPUT);
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
      for (int i = 0; i < 100; i++) {
        digitalWrite(servo, HIGH);
        digitalWrite(servo, HIGH);
        delay(1.5); // 50
        digitalWrite(servo, LOW);
        digitalWrite(servo, LOW);
        delay(20);
      }
      for (int i = 0; i < 100; i++) {
        digitalWrite(servo, HIGH);
        digitalWrite(servo, HIGH);
        delay(1.0); // 50
        digitalWrite(servo, LOW);
        digitalWrite(servo, LOW);
        delay(20);
      }
    }
  }

  Serial.println("closing connection");
  Serial.println();
}

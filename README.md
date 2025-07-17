## ✈️ NxtGen Travel — Intelligent Travel Assistance

NxtGen Travel is an AI-powered smart travel booking system that helps modern travelers plan, search, and book trips easily using intelligent automation, a chatbot, and voice search — all through a simple, user-friendly web interface.

## 📽️ Project Demo

[▶️ Watch the Demo Video] (https://screenapp.io/app/#/shared/HuS_fEbjor)


## 🚀 Features

🔐 Secure Login System

🌍 Popular Destinations with Grid Cards

🗣️ Voice Search for Flights & Hotels

🤖 AI Chatbot (Maya) for Instant Help

🛫 Flight Booking Automation

🏨 Hotel Booking with Form & Confirmation

💾 Booking Data Storage using MySQL 8.3 (Command Line)


## 💡 Project Goals

1.Build an AI-driven travel assistant combining chatbot & voice recognition.

2.Automate hotel and flight bookings with smart suggestions.

3.Develop a responsive UI using HTML, CSS, and JavaScript.

4.Use MySQL 8.3 (Command Line) for database creation and management.

5.Run the local server environment using XAMPP.

## 🗂️ Tech Stack

1.Frontend: HTML, CSS, JavaScript

2.Database: MySQL 8.3 (via Command Line)

3.Server: Local server via XAMPP (Apache & MySQL modules)

4.Voice Recognition: Browser Speech API

5.Chatbot: Custom JavaScript logic

## 🗄️ Database Structure

Database: travel_booking

Tables:

1️⃣ flight_bookings

id              INT PRIMARY KEY AUTO_INCREMENT
name            VARCHAR(...)
email           VARCHAR(...)
special_requests TEXT
flight_details  VARCHAR(...) -- airline, departure time, fare, etc.
booking_time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP

2️⃣ hotel_bookings

id          INT PRIMARY KEY AUTO_INCREMENT
name        VARCHAR(...)
email       VARCHAR(...)
phone       VARCHAR(...)
hotel       VARCHAR(...) -- hotel name
check_in    DATE
check_out   DATE

## ⚙️ How to Run Locally

1.Clone or download this repository.

2.Install XAMPP and start Apache and MySQL modules.

3.Place the project folder inside htdocs in XAMPP.

4.Open MySQL 8.3 Command Line and run:

CREATE DATABASE travel_booking;

USE travel_booking;

CREATE TABLE flight_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  special_requests TEXT,
  flight_details VARCHAR(255),
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotel_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  hotel VARCHAR(100),
  check_in DATE,
  check_out DATE
);
Link your HTML/JS/PHP scripts to connect with travel_booking DB.

Visit http://localhost/TravelBooking/ in your browser.

Use login (please register and then log in with your credentials), chatbot, voice search & booking forms.

View bookings using MySQL Command Line.

## 🔮 Future Scope

1.Real-time weather & traffic updates.

2.AR/VR previews for destinations & hotels.

3.Blockchain for secure transactions.

4.Multilingual support for global users.

## Screenshots

TravelBooking/

├── screenshots/

│   ├── login.png

│   ├── destinations.png

│   ├── chatbot.png

│   ├── flight_booking.png

│   ├── hotel_booking.png


## 🙌 Author
Bobbala Keerthi Chandana
IcfaiTech, Hyderabad


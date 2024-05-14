---
title: "Build with AI - Flutter chat bot"
description: "This CodeLab demonstrates the process of setting up everything to run the code of flutter app we built at MBSCET"
slug: "build-with-ai-flutter-gdg-jammu"
authors:
  [
    
    {
      name: "Atul Sharma",
      image: "/authors/Atul Sharma.jpeg",
      socials:
        {
          linkedin: "https://www:linkedin.com/in/atul573",
          github: "https://github.com/atul573",
          # web: "https://sudoboink.me",
        }
    },
    {
      name: "Sourav Mishra",
      image: "/authors/Sourav Mishra.jpg",
      socials:
        {
          linkedin: "https://www.linkedin.com/in/souravvmishra/",
          github: "https://github.com/souravvmishra",
          web: "https://bento.me/souravvmishra",
        }
    },
  ]
date: 2024-05-14
categories: "Technology"
duration: 30
image: "/codelabs/build-with-ai-flutter-gdg-jammu/image.png"
tags: ["MBSCET", "FLUTTER", "BUILD WITH AI", "GDG JAMMU"]
draft: false
---


# Getting Started

Here's a step-by-step guide to building the Flutter project you provided, which includes an AI conversation feature using the `flutter_gemini` package:

## Step 1: Set Up Your Flutter Environment
- **Install Flutter**: If you haven't already, install Flutter on your machine by following the instructions on the [official Flutter installation page](https://flutter.dev/docs/get-started/install){:target="_blank"}.
- **Set up an editor**: You can use an IDE like Android Studio, VS Code, or IntelliJ. Install the Flutter and Dart plugins to enable language support and tools for building Flutter apps.


## Step 2: Create a New Flutter Project
- **Create Project**: Open your terminal or command prompt and run:
  ```bash
  flutter create my_flutter_app
  ```
- **Navigate to Project Directory**:
  ```bash
  cd my_flutter_app
  ```

## Step 3: Add Dependencies
- In your project's `pubspec.yaml` file, add the `flutter_gemini` package under dependencies:
  ```yaml
  dependencies:
    flutter:
      sdk: flutter
    flutter_gemini: ^latest_version
  ```
- **Install the packages** by running:
  ```bash
  flutter pub get
  ```

## Step 4: Implement the Application Code
- Replace the content of `main.dart` with the code provided 👇 

```dart
import 'package:flutter/material.dart';
import 'package:flutter_gemini/flutter_gemini.dart';
import 'package:studycompanion/homePage.dart';

void main() {
  Gemini.init(apiKey: 'ENTER YOUR KEY HERE INSIDE QUOTES');

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

```

__Ensure to handle the imports correctly and replace the `apiKey` with your actual API key from Gemini.__



- Create a new file named `homePage.dart` in the same directory as `main.dart` and place the following code 👇

```dart
import 'package:flutter/material.dart';
import 'package:flutter_gemini/flutter_gemini.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  List<String> conversation = [];

  void getAnswer(String query) {
    final gemini = Gemini.instance;
    gemini.streamGenerateContent(query).listen((value) {
      setState(() {
        conversation.add("User: $query");
        conversation.add("AI: ${value.content!.parts![0].text}");
      });
      Future.delayed(const Duration(milliseconds: 300), () {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      });
    }).onError((error) {
      conversation.add('Error getting response from AI: $error');
      log('Error getting response from AI: $error', error: error);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                itemCount: conversation.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4.0),
                    child: Text(conversation[index]),
                  );
                },
              ),
            ),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: "Ask a question...",
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: (value) {
                      if (value.trim().isNotEmpty) {
                        getAnswer(value);
                        _controller.clear();
                      }
                    },
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: () {
                    if (_controller.text.trim().isNotEmpty) {
                      getAnswer(_controller.text.trim());
                      _controller.clear();
                    }
                  },
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

## Step 5: Run Your Application
- **Connect a device** or use an emulator.
- Run your application:
  ```bash
  flutter run
  ```


# How to Obtain a Gemini API Key

This guide details the steps to acquire an API key for the Gemini API.

## **Prerequisites:**

* A Google Cloud Platform account

## **Steps:**

1. **Navigate to the Gemini API Website:**
   - Visit the official Gemini API website: https://ai.google.dev/

2. **Request an API Key:**
   - Locate and click the button labeled `Get API key in Google AI Studio`.

3. **Access API Key Creation:**
   - On the left sidebar, click the option `Get API key`.

4. **Generate Your API Key:**
   - Click the button labeled `Create API key`.

5. **Select Project and Create Key:**
   - Choose the Google Cloud project where you intend to use the API key.
   - Click the button labeled `Create Key`.

6. **Secure Your API Key:**
   - The generated API key will be displayed. Copy this key and store it securely.


:::md-alert{type="error" }
#title
**Important Note:**
#content
Treat your API key with the same level of confidentiality as you would a password.
:::

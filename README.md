# Realtime Chat App

This project is a realtime chat app, similar to Telegram, built with Next.js 12, Supabase, Zustand, and React Query.

## Installation

To install and run this project locally, follow these steps:

    1.Clone the repository.
    2.Install the dependencies using PNPM by running pnpm install.
    3.Create a .env.local file in the root directory of the project, and add the following lines to it:

    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

    4.Replace your_supabase_url and your_supabase_anon_key with your Supabase project URL and anonymous key respectively. You can obtain these from the "Settings" page of your Supabase project dashboard.
    Start the development server using pnpm dev. The app should now be running on http://localhost:3000.
    
    
## Supabase Setup

  ### Providers
  
  Make sure to add the corresponding providers and configure them, in my case only Google.
  Modify URL Configuration on Auth tab and introduce your URLs. e.g. http://localhost:3000/auth on redirect Urls

  ### Function Handle new User
  begin
    insert into public.profiles (id, username, avatar_url, email)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email);
    return new;
    end;

### Trigger 1 
schema auth table users after insert => Handle new User

### Schema
![alt text](https://github.com/m4nute/next-supa-chat/blob/main/schema.png?raw=true)

Update: totalMsg in Chats is not needed anymore.

## Technologies

This app uses the following technologies:

    -Next.js 12
    -Supabase
    -Zustand
    -React Query
    -Tailwind CSS

## Features

This app includes the following features:

    -Realtime chat
    -Multiple chat rooms
    -User authentication and authorization

## Contributions

Contributions to this project are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.

# Booking Setup — Cal.com (5 minutes)

The "Book a meeting" floating button is wired up but needs your Cal.com username.
Until then, it shows a placeholder fallback.

## Step 1 — Create your Cal.com account

1. Go to **https://cal.com/signup**
2. Sign up (free — the basic tier covers everything you need)
3. Pick a username: it'll be your booking URL `cal.com/<username>`
   - Suggestion: `swastik-chowbay` or `swastikc` — keep it readable

## Step 2 — Connect your calendar

1. After sign-up, Cal.com asks to connect a calendar
2. Choose **Google Calendar** (or Outlook, whichever you actually use)
3. Authorize — Cal.com now reads your free/busy slots so visitors only see
   times you're actually available

## Step 3 — Set your availability

1. Cal.com → **Availability** in the sidebar
2. Set typical working hours (e.g., 9 AM – 5 PM CET, weekdays)
3. Save

## Step 4 — Create an event type

1. Cal.com → **Event Types** → **+ New Event Type**
2. Pick a name like "30-minute meeting" or "Research discussion"
3. Set duration (15 / 30 / 60 min)
4. Save

The URL is now `https://cal.com/<your-username>` — that's what we need.

## Step 5 — Update the site

1. Open `index.html` in your repo
2. Press **Ctrl/Cmd + F** and search for: `YOUR_CALCOM_USERNAME`
3. Replace with your actual username (just the username, not the full URL)
   - Example: if your Cal.com URL is `https://cal.com/swastikc`, the line becomes:
     ```
     data-cal-username="swastikc"
     ```
4. Commit. Done — the booking modal now loads your real Cal.com embed.

## What you get

- Every time someone books a slot → **you get an email** with their name,
  email, time, and any notes
- A **calendar invite** is added to your Google/Outlook automatically
- **The visitor also gets a confirmation email** with the calendar invite
- If you need to **cancel or reschedule**, do it from Cal.com or your calendar
  — both parties get notified

## Optional polish

- **Custom questions**: Cal.com → Event Type → "Questions" → add fields like
  "What would you like to discuss?" so you know what to prepare for
- **Buffer time**: Add 15-minute buffers between meetings so back-to-back
  bookings don't drain you
- **Working hours per event type**: e.g., research discussions only on
  Wednesday afternoons
- **Custom branding**: free tier lets you adjust colors to match the site

## Troubleshooting

**"The widget says 'configured incorrectly'"** — your username is wrong.
Double-check at cal.com — the username should NOT contain `https://`, `cal.com/`,
or any slashes. Just the bare username (e.g., `swastikc`).

**"Booking widget appears but is white/unstyled in dark mode"** — Cal.com
respects the URL `theme` parameter we pass; the site auto-detects which theme
you have toggled. If something looks off, just close and reopen the modal.

**"I want to disable the booking widget temporarily"** — easiest way is to
hide the floating button. In `css/style.css` add at the bottom:
```css
.book-fab, .book-modal { display: none !important; }
```

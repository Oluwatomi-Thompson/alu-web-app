# Country Explorer 
**A Real-time Data Application using the Rest Countries API**

Country Explorer is a web-based application designed to provide users with essential geographical and demographic data for all countries globally. The application fetches real-time data from a third-party API and allows users to interact with that data through searching, filtering, and sorting.

---

## Project Links

| Server | URL |
|---|---|
| Load Balancer (Public Access) | http://54.152.46.14 |
| Web Server 01 | http://13.218.66.188 |
| Web Server 02 | http://3.84.46.16 |

---

## Features

- **Real-time API Integration:** Fetches country names, populations, regions, and flags.
- **Search Functionality:** Instant search by country name.
- **Regional Filtering:** Filter countries by continent (Africa, Europe, Asia, Americas, Oceania).
- **Population Sorting:** Sort data from Low → High or High → Low.
- **Responsive Design:** A clean, modern UI built with CSS Grid that works on all screen sizes.
- **High Availability:** Deployed across two web servers with a load balancer.

---

## API Information

This project utilizes the **Rest Countries API**.

- **Documentation:** https://restcountries.com/
- **Endpoint:** `https://restcountries.com/v3.1/all?fields=name,population,region,flags`
- **Attribution:** Data provided by the Rest Countries open-source project.

---

## Local Setup

To run this project on your local machine:

1. **Clone the repository:**
```bash
   git clone <your-github-repo-link>
```

2. **Navigate to the project folder:**
```bash
   cd <project-folder-name>
```

3. **Launch the application:**
   Open `index.html` in any modern web browser.

---

## Deployment & Load Balancer Configuration

### Server Infrastructure

| Role | IP Address | Stack |
|---|---|---|
| Web01 | `13.218.66.188` | Ubuntu / Apache |
| Web02 | `3.84.46.16` | Ubuntu / Apache |
| Lb01 | `54.152.46.14` | Load Balancer |

### Deployment Steps

1. **Code Synchronization:** Application files (`index.html`, `style.css`, `script.js`) were deployed to `/var/www/html` on both Web01 and Web02.
2. **Verification Banners:** A unique HTML banner was added to each server's `index.html` (e.g., *"Served by Web01"*) to confirm the load balancer is successfully alternating between backends.
3. **Load Balancer Configuration:**
   - Configured the listener on **Port 80**.
   - Added Web01 and Web02 IPs to the backend target group.
   - Round Robin scheduling was confirmed by refreshing the Load Balancer IP and observing server banner changes.

---

## Error Handling & Security

- **Graceful Degradation:** The `getCountries` function uses `try-catch` blocks. If the API fails, the UI displays a *"Failed to load data"* message rather than crashing.
- **Key Management:** This application uses a public API — no sensitive API keys are exposed in the repository.
- **Clean Code:** Adheres to modern JS practices, including `async/await` and template literals for clean DOM injection.

---

## Challenges & Solutions

| Challenge | Solution |
|---|---|
| Formatting raw population integers for readability | Used `toLocaleString()` to transform `1000000` into `1,000,000` |
| Ensuring consistent UI across servers | Used CDN links for FontAwesome and Google Fonts so assets load regardless of which server handles the request |

---

## Demo Video

> [Insert your YouTube/Vimeo link here]

The video demonstrates local functionality, search/filtering, and the Load Balancer's ability to distribute traffic between Web01 and Web02.
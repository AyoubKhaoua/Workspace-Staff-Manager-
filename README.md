# Project title
Staff Space Manager

# Project purpose
The project offers a digital interface for managing staff placement inside a building. The user adds staff, assigns them to zones, moves them, and removes them. The system respects strict role rules. The user views all staff and zones in one place. The interface stays fast and responsive on desktop, tablet, and mobile.

## Main features
The user adds a worker through a modal with fields for name, role, photo URL, email, phone, and past experience. The user views a live photo preview. The user sees all unassigned workers in a side panel. The main screen shows six building zones, each with a zone name, a plus button for adding staff, and workers already assigned.

## Role rules
Reception accepts only receptionists.
Server room accepts only IT technicians.
Security room accepts only security agents.
Managers access all zones.
Cleaning staff access all zones except the archives room.
Other roles access zones without restrictions.

## Zone management
Each zone displays workers. Each worker has an X button for removal. Zones with mandatory presence appear in pale red when empty. Conference room and staff room stay neutral because all roles access them. The system enforces worker limits per zone.

## User profile
The user clicks a worker to open a full profile view. The profile shows a large photo, name, role, email, phone, experience, and current location.

## Design
The layout uses Flexbox and Grid. The style follows a modern look with rounded shapes and color buttons in green, orange, and red. The interface adapts to all screen sizes. The project includes CSS animations.

## Technical rules
HTML and CSS pass W3C validation.
The project publishes on GitHub Pages or Vercel.

## Screen support
Large desktop above 1280 pixels.
Small desktop from 1024 to 1279 pixels.
Tablet from 768 to 1023 pixels.
Mobile up to 767 pixels.
Mobile landscape from 768 to 1023 pixels.
Tablet landscape from 1024 to 1279 pixels.

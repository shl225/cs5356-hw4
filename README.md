# CS5356 with Ludwig Schubert – HW3

This is a simple react task manager application showing several things:
- Using tailwind and shadcn/ui components for cohesive UI
- User-customizable categories using custom components
- Browser persistence in the form of persisting tasks with custom hook

## Overview

The app displays tasks with text editing toggles for complete or incomplete and optional due dates. You can filter tasks by category or view all. The default stats on total tasks completed and remaining are shown (not modifed from original file). User-created categories appear alongside built-in categories. If categories are deleted, tasks in that category revert to uncategorized.

## Extra credit

All three extra credits are implemented in my project  
* 1 - Porting all default components to shadcn/ui (old ones are labeled `_old`) 
* 2 - Creating user-customizable categories  
* 3 - Implementing a custom hook for persistence  

Please consider all three extra credits for grading!

## Notes

My original repo that I used for this project is available [here](https://github.com/shl225/cs5356-hw4). Github Copilot and Tailwind CSS IntelliSense plugins on VSCode assisted with helping on parts of the code and formatting. Please see my code comments for details about my implementation. Components that I made or the original default app had are in CamelCase, and components that are added via shadcn/ui are lowercase.

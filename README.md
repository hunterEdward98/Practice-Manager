# Practice Manager 2020

Practice Manager is an app created to make managing your swim practices easier, so you can focus on the important things, rather than worry about the calculations.

## Login Safe

Other teams cannot access your team's data until you promote them to athlete or higher within your organization

## Site Owner

The Site Owner Will have High Level Access, being able to add and remove organizations and edit their users

### Adding/Removing Organizations

To Add An Organization, the Site Owner can just put a name into the input field.
To remove, Just click the trash can next to the organization name. it will ask you to confirm this decision, as the organization is non-recoverable

![Orgs Page](/assets/Site-Owner-orgs.png)

### Editing/Removing Users

The Site Owner, after adding an organization, will need to promote a user to Administrator. They should not need to do anything with users in the organization after that, unless there is a change in administrators

![Users Page](/assets/Site-Owner-user.png)

## Administrator / Head Coach / Coach

### Editing/Removing Users

Users in these roles have permissions to edit users in their organization from any clearence below their own. The permission levels, from Highest to Lowest, are listed below

(1. Site Owner)

2. Administrator
3. Head Coach
4. Coach
5. Manager
6. Athlete
7. Unapproved

### Approving Users

To Approve a user, simply change their access level from nothing to your desired role for that user.

## Athlete History

Anyone with an access level of Athlete or above can search for an athlete. The result of typing is a dropdown that shrinks to only include results that match your text

Athletes and Managers have access to view, but to edit any information on this page.

Coaches and Above have access to edit or delete an athlete, or any time that athlete has in their history

### Active Status

Active Status indicates whether that athlete is on your active roster.

if set to false, you will no longer be able to see that athlete when adding times.

if set to true, you will be able to see them when adding times

### Year

Year indicates what year the athlete is in. This is useful information to high school coaches and managers so they know whether to change someone to inactive at the end of the season

### Lane

Lane indicates what lane the athlete is swimming in. This is useful for the 'sort by lane feature'

## Set Manager

The set manager is where a coach or manager will go to add times to an athlete's record.

You need to select a set to use this feature

### Add Time

Only users with an access level of Manager or above have access to this feature

To add a time to the set for the current athlete, put the minutes, then seconds into the input fields, then press add time. empty input fields will be assumed to be 0

- After Adding a Time, the current count will go up, Indicating how many times you have submitted this set, and the average will be calculated automatically and displayed.

### Submit Set

The option to submit a set will appear after the first time has been added to it.

- After submitting a set, the previous time will refresh to the time you just submitted, and improvement will be automatically calculated.
- If the Athlete improved, the improvement will be negative, and in green
- If the Athlete did worse, the improvement will be positive, and in red.
- If the Athlete did the same, the improvement will be 0, and in yellow.

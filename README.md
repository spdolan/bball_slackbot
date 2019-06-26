# Awesome Slack Bot

Troll bot created by Project Shift Cohort 6. This is a general planning doc - anyone can edit

###### TODO

- [ ] decide on app name
- [ ] get data - 'model'
  - [ ] choose input team (so this can be used for other people/teams)
  - [ ] get team schedule
  - [ ] get data for game days - run script day after?
  - [ ] store in database?
  - [ ] create interface for view
- [ ] send through webhook - 'view'
  - [X] get slack channel link
  - [X] create post request
  - [X] send post req to slack channel
  - [ ] auto 'render' when model changes
  - [ ] refactor with parameters
    - [ ] channel, message - always required
    - [ ] target user, alt message - optional. target user is like '@Dan'
- [ ] customize bot appearance
## NOTES
Replace out of the box Tailwind CSS colors with standard colors.

Regex to find a block of html attribs and replace just one occurrence in there
className="mt-3-md shadow sm:mt-0 sm:ml-3 text-gray"
with
className="mt-3-md shadow sm:mt-0 sm:ml-3 text-orange"

search regex className="(.*) text-gray-darkest(.*)"
replace regex className={`$1 ${brandColors.defaultTextColor}$2`}
focus:ring-tennisorange
focus:border-tennisorange

$1 is the variable from the search in brackets (.*) - use more if search text is in the middle

## ⚠️ TO DO PILE
DONE: <a> tags with <Link> next/link
DONE: <img> tags with <Image> next/image
DONE: Multiple styles for Hero

DONE: Payment and checkout pages
TODO: Contact form integration
TODO: Per page SEO instead of global
TODO: Preview of pages


## 💻 UI
See others in Tab Stash
- Lots of Clean Frntr UI elements - https://github.com/CrystallizeAPI/crystallize-nextjs-boilerplate
https://flowrift.com/c/full-page/FlsIL?view=preview

NextJS Preview Instructions
https://dev.to/dlw/using-next-js-preview-mode-with-strapi-cms-362n

### Setup GitHub Token-based Login
  Using SSH
  https://awsm.page/git/use-github-with-ssh-complete-guide-including-vscode-setup/

### Setup GitHub Token-based Login
  Using SSH
  https://awsm.page/git/use-github-with-ssh-complete-guide-including-vscode-setup/

 ssh -T git@github.com
 git remote -v (to check if any other authentication mechanism was used)
 git remote set-url origin git@github.com:USERNAME/REPOSITORY.git

 ### Cascade <main> changes into brand domains
 
  Process when <main> branch changes
  1 - switch branch
  git switch <branchname>
  
  2 - pull changes from main (without auto-committing changes with no-commit param)
  git pull --no-commit origin main <branchname>

  3 - review mods and conflicts

  4 - push commits to <branchname>
  git push origin <branchname>

  5 - wait for deploy and then test and validate

### Other Commands
git pull from main repo or push base-repo/master branch to other dependent repos using commands above
(or git merge --no-ff <remote_repo_reference>/<branchname> if merging within same repo)
git merge --no-ff website/main

dynamically redirect users after login -- 
https://developer.amazon.com/docs/login-with-amazon/dynamically-redirect-users.html

## 🚀 FUTURE

-  implement automatic translations of pages
https://aws.amazon.com/blogs/machine-learning/translating-documents-with-amazon-translate-aws-lambda-and-the-new-batch-translate-api/
You can run the asynchronous Batch Translation daily to localize your documentation, teaching material, and blogs to the language of your choice.


- Private Coaching (product)
  - Session Config
      Name
      Type
      Duration
      Pricing
  - Calendar Events (coach and session availability)
  - Coaches (select sub-team from Team)
  - Bookings (player bookings)
    - AWS db of appointments (union of coach + player + time/day + session)

  - Sessions - similar to courses with their own prices, types, durations etc.
  - Coaches - a subset of people picked from the Team already defined in CMS
  - Calendar - which defines when Sessions are available
  - Bookings - which is a AWS DB that stores the actual confirmed, paid appointments between coach, player, session and specific day/time
## 🚀 Deployment
- when connecting AWS Amplify to github repo add env variables
- pull down existing config from the cloud 
  amplify pull --appId d3pdatwt5tvhgb --envName live  

- add below to App.js to set up Auth
  import config from "../src/aws-exports"
  var { Amplify } = require("aws-amplify");
Amplify.configure({ ...config, ssr: true });

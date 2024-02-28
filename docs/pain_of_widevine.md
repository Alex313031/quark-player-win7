## The Pain of Widevine

People using this app should be aware of its difficultly to maintain due to the requirement of Widevine. Widevine is a DRM plugin created by Google and it is used by Netflix, Hulu and many other streaming services. Widevine has already caused an outright fail of Netflix within this app and the only solution I could find ended up with the app having multiple `package.json` files one for each os. They also each use different versions of Electron. The Mac version is using the older version of Electron and it is locked on a version which was published on the 5th of June 2019. Unless a fix presents itself this app will be discontinued in its current form when Netflix stop working on Mac. I have no clue when that will be but my guess is 1-2 years because I am sadly not expecting any working solutions to come foward. The only other possible solution is obtaining a Widevine signing certificate from Google. Which is not possible due to this being a "small" open source project. I may also [copy metastream](https://github.com/samuelmaddock/metastream/issues/85) and move the app to a browser based PWA instead of fully discontinuing it. A good article about this issue can be [read here](https://blog.samuelmaddock.com/posts/google-widevine-blocked-my-browser/).
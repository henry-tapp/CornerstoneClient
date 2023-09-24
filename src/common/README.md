# Common

This folder mainly exists for common code that isn't necessarily a re-usable component but does likely contain code we want to re-use across multiple web components.

The main obvious example is the `App` component in here which wraps all the common boilerplate, provider setup, api config and other 'mess' into a single wrapper that all the webcomponents can use. This was we only have the 1 place to make any changes in the future for it to be reflected everywhere.

# useModal

Modals are surprisingly difficult, for a lot of reasons. This won't cover solving accessibility problems, since that seems pretty well solved with RadixUI's Dialog component and the same component from ReachUI.

## What do we tackle in this example?

- Provide an interface that works the same regardless of what your modal looks like or how it's triggered.
- Make the interface type-safe.
- Make the system tree-shakeable.
- Make it so that you can lazy load modals.
- Setup entry animations and - more importantly - exit animations.

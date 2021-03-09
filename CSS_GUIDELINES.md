# CSS Guidelines for Conun Blockchain Explorer

The purpose of this file is to establish the order into which CSS is organised in the CSS files.

The hierarchy of CSS selectors follows their hierarchy in the site.
The more fundamental parts of the site are at the top.
The less fundamental parts of the site are at the bottom.

Thus, in styling a table, classes for the outer frame come first, and it gradually works inwards.

Media queries appear at the very bottom of the CSS.
Animations appear above that.

For defining global variables, these come at the top of the body class.

### Precedence of properties inside a selector

Precedence follows: Size, Spacing,

##### Size

If present, the top-most properties will be width and height.
This includes max/min height values.

##### Spacing

If present, the next properties will be margin and padding. Box-sizing rules go in this category

##### Display / Positioning

If present, the next properties will be the class' display rules - flex/grid, direction, justify/align, or grid-template, or top/left.
Z-index relates to this category, and goes below flex rules.

##### Outer Appearance

If present, the next properties will be background and border rules.
Background is placed above border, and a border tag supercedes a border-x tag.

##### Font Rules

If present, font rules are next. Rules regarding font family are first, then sizing, and then colour. Text decoration rules fall under this category.

##### Misc

Other rules are placed above animation. This includes user-select, for example.

##### Animation Rules

Animation and transition properties are at the bottom.

### Spacing

There should be a space separating each class.
Inside a class, if the class has more than two properties, apply spacing between the properties.

In general, categories that have more than three rules should be spaced apart from others. In classes with few rules, single rules can be spaced apart.

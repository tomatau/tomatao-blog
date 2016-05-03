---
Title:  How to build an Accordion
Author: Thomas `tomatao` Hudspith-Tatham
Tags:   open-source, react
Date:   April 4, 2016
---
# How to build an Accordion

Let's walk through building an Accordion component in a flexible and simple manner.

## What concerns you?

First, split up the concerns. An accordion often combines two features, managing which of a list of items is open.. and what the items in that list look like when opening and closing. The second of these concerns can be moved into the items themselves so that the Accordion can do one thing and do it well!

So now, the task of an Accordion is simply to manage which items in a list are "open".  We can start with assuming only 1 item should be open and future enhancements can enable more than one to be open.

#### **NB:** We'll build it in mind so that each item can shortcut to an open state without the Accordions involvement.

## Root Element Please!

OK, so first things first, the accordion element. An accordion could work with a number of different tags, DIV, UL, OL, DL, TABLE... so lets not make a decision here other than a sensible default, div. Let's also add a default className for good measure too.

```js
class Accordion extends Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  static defaultProps = {
    tag: 'div',
  };

  render() {
    const { children, className, tag, ...props } = this.props
    const newProps = {
      ...props,
      className: cx('accordion', className),
    }

    return React.createElement(tag, newProps, children)
  }
}
```

Here we're just rendering the children straight through at first and dynamically creating an element -- allowing any props to get passed through.

## And what about the items?

Next, let's modify the children to give a thin API.

Each direct child of the accordion will receive two extra props from the Accordion itself. The first, `isOpen` will be a boolean to tell the child if the Accordion thinks it should be the child who is open. The other prop `requestOpen` will be a callback function for the child to invoke when it wishes to be open.

Here's the render function so far:

```js
render() {
  const { children, className, tag, ...props } = this.props
  const newProps = { ...props, className: cx('accordion', className) }

  return React.createElement(tag, newProps,
    React.Children.map(children, (child, i) =>
      React.cloneElement(child, {
        className: cx('accordion__item', child.props.className),
        isOpen: false,
        requestOpen: this.handleRequestOpen.bind(this, i),
      })
    )
  )
}
```

We're cloning each child with the two new props, isOpen, which is false for the time being, and the requestOpen function the child can invoke. We've also added a new className onto each child `.accordion__item`, just for good measure.

We've bound the `requestOpen` function to the index of the child, this will help us manage which child has requested being opened and which child to set `isOpen=true` for.

## Open Me Please

Next, lets handle the `requestOpen`, we've already wired up the handler, so lets define it.

```js
state = {
  openIndex: null,
};

handleRequestOpen(idx) {
  this.setState({ openIndex: idx })
}
```

It literally just updates some state to say which item index is open. We could store this information in some sort of store if we really wanted -- but that might be overkill for such a simple component.

Here we should also update the render function, lets grab the openIndex from state and use it to determine which item is open.

And the Accordion is complete!

```js
class Accordion extends Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  static defaultProps = {
    tag: 'div',
  };

  state = {
    openIndex: null,
  };

  handleRequestOpen(idx) {
    this.setState({ openIndex: idx })
  }

  render() {
    const { children, className, tag, ...props } = this.props
    const { openIndex } = this.state
    const newProps = { ...props, className: cx('accordion', className) }
    return React.createElement(tag, newProps,
      React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          isOpen: child.props.isOpen == null
            ? child.props.isOpen
            : openIndex == i,
          className: cx('accordion__item', child.props.className),
          requestOpen: this.handleRequestOpen.bind(this, i),
        })
      )
    )
  }
}
```

#### **NB:** I've added a little check if the child already has an `isOpen` prop so we can override the accordion behaviour if we like.

## Writing Accordion Items

How can we use such an elegant beauty? Well we will need to make custom Accordion items, they can wrap around existing components in an Adapter style pattern to communicate with the parent accordion!

```jsx
class ListItem extends Component {
  render() {
    const { isOpen, requestOpen, className } = this.props
    return (
      <li className={cx(className, { isOpen })}
        onClick={requestOpen}>
        {this.renderTitle()}
        {isOpen ? this.renderContent() : null}
      </li>
    )
  }
}
```

Here is a little component that we can use inside the accordion, it will only render its content when it's open. We can then write styles however we like to animation transitions. We could make various different types of AccordionItems for each of our use cases and keep them all separate, just wrapping existing components.

```jsx
<Accordion tag='ul'>
  <ListItem />
  <ListItem />
  {/* make one item always open */}
  <ListItem isOpen={true} />
</Accordion>
```

Simple as that.

## Taking it further...

No need to stop here. Other APIs could be introduced such as `openMultiple` into the Accordion itself. Also wrappers such as redux connect functions can be used to short-cut the isOpen prop based on global state.

```jsx
@connect((state, props) => ({
  isOpen: selectors.isItemOpen(state) || props.isOpen
}))
class DivItem ...
```

It may even help to expose the index to AccordionItems as a prop too, then they can answer questions about their position in the Accordion. The list goes on.

The main point here is, by focusing on a single concern, managing which of the children should be "open", our Accordion has become a very simple component, which would be easy to extend and flexible to integrate with.

Stay tuned for more posts!

- tomatao

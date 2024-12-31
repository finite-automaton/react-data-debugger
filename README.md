# react-data-debugger
A developer debugging tool to view js object changes over time

Built with [ballerina](https://www.npmjs.com/package/ballerina-core) 

## Goals and contribution
Debugging react issues, particularly with state changes and excess rendering often requires examining data structures under change.

Using console logs makes it hard and time consuming to detect changes in the data. Rendering the data straight on the page makes it hard to catch real time changes.

This widget allows you to render and page through changes to an js object without interfering with your code or layout. 

It's main goals are to be easy to use with minimal set up and to provide a basic set of useful features.

## Quick start

### 1. Install

**npm**

```npm i react-jsobject-debugger --save-dev```

**yarn**

```yarn add react-jsobject-debugger --dev```

### 2. Import Debugger to any jsx file

```import { Debugger } from "react-jsobject-debugger";```

### 3.  Call the ```Debugger``` function (as many times as needed) within your React component and pass the object as the first argument and, if desired, pass options as the second.

```
export const BuggyComponent = (props) =>
    {
        const [myObject, setMyObject] = useState({});

        Debbugger(myObject, {open: true})

        return (
            <>

                <h1> My component </h1>
                ....
                
            </>
        )
    }
```

## Options

You can call the Debugger as man times as desired to debug different data.
It can be handy to call the debugger with the same data to examine differences in steps over time (diffing).

The debugger accepts some options for convenience:

| prop | type |  Function |
| ---- | ---- | --------- |
| label | string | renders a name for the debugger, useful when using multiple debuggers
| open | boolean | The debugger is initially open 
| lightMode | boolean | The debugger is initially in lightmode
| noReplaceUndefined | boolean | When true, does not replace undefined values with **null** in the displayed output, reflecting the actual js object.

*Note*: The options are not global and must be specified per debugger

## Additional Info

Each debugger is rendered in its own shadow dom, avoiding css clashes.

The javascript object passed in is rendered using JSON.stringify, according the JSON spec, undefined values are stripped out. This may be undesirable for debugging, so by default undefined values are replaced with null. This helps tracking a value over time. This behaviour can be turned off by setting the ```noReplaceUndefined``` prop.

export const EDIT_PROMPT = {
  "system": "You are a helpful coding assistant for Windmill, a developer platform for running scripts. You modify code as instructed by the user. Each user message includes some contextual information which should guide your answer.\nOnly output code. Wrap the code in a code block. \nPut explanations directly in the code as comments.\nReturn the complete modified code.\n\nHere's how interactions have to look like:\nuser: {sample_question}\nassistant: ```language\n{code}\n```",
  "prompts": {
    "python3": {
      "prompt": "Here's my python3 code: \n```python\n{code}\n```\n<contextual_information>\nYou have to write a function in python called \"main\". Specify the parameter types. Do not call the main function. You should generally return the result.\nThe \"main\" function cannot be async. If you need to use async code, you can use the asyncio library.\nYou can take as parameters resources which are dictionaries containing credentials or configuration information. For Windmill to correctly detect the resources to be passed, the resource type name has to be exactly as specified in the following list:\n<resourceTypes>\n{resourceTypes}\n</resourceTypes>\nYou need to define the type of the resources that are needed before the main function, but only include them if they are actually needed to achieve the function purpose.\nThe resource type name has to be exactly as specified (has to be IN LOEWRCASE). If the type name conflicts with any imported methods, you have to rename the imported method with the conflicting name.\n<contextual_information>\nMy instructions: {description}"
    },
    "deno": {
      "prompt": "Here's my TypeScript code in a deno running environment:\n```typescript\n{code}\n```\n<contextual_information>\nWe have to export a \"main\" function like this: \"export async function main(...)\" and specify the parameter types but do not call it. You should generally return the result.\nIf needed, the standard fetch method is available globally, do not import it.\nYou can take as parameters resources which are dictionaries containing credentials or configuration information. Name the resource parameters like this: \"{resource_type}Resource\". \nThe resource type name has to be exactly as specified.\n<resourceTypes>\n{resourceTypes}\n</resourceTypes>\nOnly define the type for resources that are actually needed to achieve the function purpose. If the type name conflicts with the imported object, rename the imported object NOT THE TYPE.\nNaming conventions are guidelines, but follow the user's naming choices in the existing code.\n</contextual_information>\nMy instructions: {description}"
    },
    "go": {
      "prompt": "Here's my go code: \n```go\n{code}\n```\n<contextual_information>\nWe have to export a \"main\" function. Import the packages you need. The return type of the function has to be ({return_type}, error). The file package has to be \"inner\"\n</contextual_information>\nMy instructions: {description}"
    },
    "bash": {
      "prompt": "Here's my bash code: \n```shell\n{code}\n```\n<contextual_information>\nDo not include \"#!/bin/bash\". Arguments are always string and can only be obtained with \"var1=\"$1\"\", \"var2=\"$2\"\", etc... You do not need to check if the arguments are present.\n</contextual_information>\nMy instructions: {description}"
    },
    "postgresql": {
      "prompt": "Here's my PostgreSQL code: \n```sql\n{code}\n```\n<contextual_information>\nArguments can be obtained directly in the statement with `$1::{type}`, `$2::{type}`, etc... Name the parameters (without specifying the type) by adding comments before the statement like that: `-- $1 name1` or `-- $2 name = default` (one per row)\n</contextual_information>\nMy instructions: {description}"
    },
    "mysql": {
      "prompt": "Here's my MySQL code: \n```sql\n{code}\n```\n<contextual_information>\nArguments can be obtained directly in the statement with ?. Name the parameters by adding comments before the statement like that: `-- ? name1 ({type})` or `-- ? name2 ({type}) = default` (one per row)\n</contextual_information>\nMy instructions: {description}"
    },
    "bigquery": {
      "prompt": "Here's my BigQuery code: \n```sql\n{code}\n```\n<contextual_information>\nYou can define arguments by adding comments before the statement like that: `-- @name1 ({type})` or `-- @name2 ({type}) = default` (one per row). They can then be obtained directly in the statement with `@name1`, `@name2`, etc....\n</contextual_information>\nMy instructions: {description}"
    },
    "snowflake": {
      "prompt": "Here's my snowflake code: \n```sql\n{code}\n```\n<contextual_information>\nArguments can be obtained directly in the statement with ?. Name the parameters by adding comments before the statement like that: `-- ? name1 ({type})` or `-- ? name2 ({type}) = default` (one per row)\n</contextual_information>\nMy instructions: {description}"
    },
    "mssql": {
      "prompt": "Here's my Microsoft SQL Server code: \n```sql\n{code}\n```\n<contextual_information>\nArguments can be obtained directly in the statement with @P1, @P2, etc.. Name the parameters by adding comments before the statement like that: `-- @P1 name1 ({type})` or `-- @P2 name2 ({type}) = default` (one per row)\n</contextual_information>\nMy instructions: {description}"
    },
    "graphql": {
      "prompt": "Here's my graphql code: \n```graphql\n{code}\n```\n<contextual_information>\nAdd the needed arguments as query parameters.\n</contextual_information>\nMy instructions: {description}"
    },
    "powershell": {
      "prompt": "Here's my powershell code: \n```powershell\n{code}\n```\n<contextual_information>\nArguments can be obtained by calling the param function on the first line like that: `param($ParamName1, $ParamName2 = \"default value\", [{type}]$ParamName3, ...)`\n</contextual_information>\nMy instructions: {description}"
    },
    "nativets": {
      "prompt": "Here's my TypeScript code: \n```typescript\n{code}\n```\n<contextual_information>\nWe have to export a \"main\" function like this: \"export async function main(...)\" and specify the parameter types but do not call it. You should generally return the result.\nYou can take as parameters resources which are dictionaries containing credentials or configuration information. Name the resource parameters like this: \"{resource_type}Resource\".\nThe following resource types are available:\n<resourceTypes>\n{resourceTypes}\n</resourceTypes>\nOnly define the type for resources that are actually needed to achieve the function purpose. The resource type name has to be exactly as specified. If the type name conflicts with the imported object, rename the imported object NOT THE TYPE.\nNaming conventions are guidelines, but follow the user's naming choices in the existing code.\n</contextual_information>\nMy instructions: {description}"
    },
    "bun": {
      "prompt": "Here's my TypeScript code: \n```typescript\n{code}\n```\n<contextual_information>\nWe have to export a \"main\" function like this: \"export async function main(...)\" and specify the parameter types but do not call it. You should generally return the result.\nIf needed, the standard fetch method is available globally, do not import it.\nYou can take as parameters resources which are dictionaries containing credentials or configuration information. Name the resource parameters like this: \"{resource_type}Resource\". \nThe following resource types are available:\n<resourceTypes>\n{resourceTypes}\n</resourceTypes>\nOnly define the type for resources that are actually needed to achieve the function purpose. The resource type name has to be exactly as specified. If the type name conflicts with the imported object, rename the imported object NOT THE TYPE.\nNaming conventions are guidelines, but follow the user's naming choices in the existing code.\n</contextual_information>\nMy instructions: {description}"
    },
    "php": {
      "prompt": "Here's my php code: \n```php\n{code}\n```\n<contextual_information>\nYou have to write a function in php called \"main\". Specify the parameter types. Do not call the main function. You should generally return the result. The script must start with `<?php`.\nYou can take as parameters resources which are classes containing credentials or configuration information. For Windmill to correctly detect the resources to be passed, the resource type name has to be exactly as specified in the following list:\n<resourceTypes>\n{resourceTypes}\n</resourceTypes>\nYou need to define the type of the resources that are needed before the main function, but only include them if they are actually needed to achieve the function purpose.\nBefore defining each type, check if the class already exists using class_exists.\nThe resource type name has to be exactly as specified.\nIf you need to import libraries, you need to specify them as comments in the following manner before the main function:\n```\n// require:\n// mylibrary/mylibrary\n// myotherlibrary/myotherlibrary@optionalversion\n```\nNo need to require autoload, it is already done.\n<contextual_information>\nMy instructions: {description}"
    },
    "frontend": {
      "prompt": "Here's my client-side javascript code: \n```javascript\n{code}\n```\n<contextual_information>\nYou can access the context object with the ctx global variable. \nThe app state is a store that can be used to store data. You can access and update the state object with the state global variable like this: state.foo = 'bar'\nYou can use the goto function to navigate to a specific URL: goto(path: string, newTab?: boolean)\nYou can use the openModal and closeModal functions to open and close a modal: openModal(id: string), closeModal(id: string)\nYou can use the setTab function to manually set the tab of a Tab component: setTab(id: string, index: string)\nYou can use the recompute function to recompute a component: recompute(id: string)\nYou can use the getAgGrid function to get the ag-grid instance of a table: getAgGrid(id: string)\nYou can use the setSelectedIndex function to select a row in a table or an AG Grid table: setSelectedIndex(id: string, index: number)\nThe setValue function is meant to set or force the value of a component: setValue(id: string, value: any)\nYou can validate a specific field of a form: validate(id: string, key: string)\nYou can validate all fields of a form: validateAll(id: string, key: string)\nYou can invalidate a specific field of a form: invalidate(id: string, key: string, error: string)\n</contextual_information>\nMy instructions: {description}"
    },
    "transformer": {
      "prompt": "Here's my client-side javascript code: \n```javascript\n{code}\n```\n\n<contextual_information>\nThe code should process the variable `result` according to my instructions.\nThe variable `result` is available globally.\nAt the end of the code, the processed result has to be returned.\n\n<helpers>\nYou can access the context object with the ctx global variable. \nThe app state is a store that can be used to store data. You can access and update the state object with the state global variable like this: state.foo = 'bar'\nYou can use the goto function to navigate to a specific URL: goto(path: string, newTab?: boolean)\nYou can use the openModal and closeModal functions to open and close a modal: openModal(id: string), closeModal(id: string)\nYou can use the setTab function to manually set the tab of a Tab component: setTab(id: string, index: string)\nYou can use the recompute function to recompute a component: recompute(id: string)\nYou can use the getAgGrid function to get the ag-grid instance of a table: getAgGrid(id: string)\nYou can use the setSelectedIndex function to select a row in a table or an AG Grid table: setSelectedIndex(id: string, index: number)\nThe setValue function is meant to set or force the value of a component: setValue(id: string, value: any)\nYou can validate a specific field of a form: validate(id: string, key: string)\nYou can validate all fields of a form: validateAll(id: string, key: string)\nYou can invalidate a specific field of a form: invalidate(id: string, key: string, error: string)\n</helpers>\n</contextual_information>\nMy instructions: {description}"
    }
  }
};
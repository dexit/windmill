<script lang="ts">
	import { addWhitespaceBeforeCapitals, capitalize, classNames } from '$lib/utils'
	import Tooltip from '$lib/components/Tooltip.svelte'
	import ConnectedInputEditor from './inputEditor/ConnectedInputEditor.svelte'
	import EvalInputEditor from './inputEditor/EvalInputEditor.svelte'
	import RowInputEditor from './inputEditor/RowInputEditor.svelte'
	import StaticInputEditor from './inputEditor/StaticInputEditor.svelte'
	import UploadInputEditor from './inputEditor/UploadInputEditor.svelte'
	import { getContext, createEventDispatcher } from 'svelte'
	import type { AppViewerContext, RichConfiguration } from '../../types'
	import type { InputConnection, InputType, UploadAppInput } from '../../inputType'
	import ToggleButtonGroup from '$lib/components/common/toggleButton-v2/ToggleButtonGroup.svelte'
	import ToggleButton from '$lib/components/common/toggleButton-v2/ToggleButton.svelte'
	import { FunctionSquare, Loader2, Pen, Plug2, Upload, User } from 'lucide-svelte'
	import { fieldTypeToTsType } from '../../utils'
	import EvalV2InputEditor from './inputEditor/EvalV2InputEditor.svelte'
	import ConnectionButton from '$lib/components/common/button/ConnectionButton.svelte'

	import Toggle from '$lib/components/Toggle.svelte'

	export let id: string
	export let componentInput: RichConfiguration
	export let key: string
	export let userInputEnabled: boolean = false
	export let shouldCapitalize: boolean = true
	export let resourceOnly = false
	export let tooltip: string | undefined = undefined
	export let fieldType: InputType
	export let subFieldType: InputType | undefined
	export let format: string | undefined
	export let selectOptions: string[] | undefined
	export let fileUpload: UploadAppInput['fileUpload'] | undefined = undefined
	export let placeholder: string | undefined
	export let customTitle: string | undefined = undefined
	export let displayType: boolean = false
	export let allowTypeChange: boolean = true
	export let shouldFormatExpression: boolean = false
	export let fixedOverflowWidgets: boolean = true
	export let loading: boolean = false
	export let acceptSelf: boolean = false
	export let recomputeOnInputChanged = true
	export let showOnDemandOnlyToggle = true
	export let documentationLink: string | undefined = undefined
	export let markdownTooltip: string | undefined = undefined
	export let securedContext = false

	const { connectingInput, app } = getContext<AppViewerContext>('AppViewerContext')

	const dispatch = createEventDispatcher()

	let evalV2editor: EvalV2InputEditor
	function applyConnection(connection: InputConnection) {
		const expr = `${connection.componentId}.${connection.path}`
		//@ts-ignore
		componentInput = {
			...componentInput,
			type: 'evalv2',
			expr: expr,
			connections: [
				{ componentId: connection.componentId, id: connection.path.split('.')[0].split('[')[0] }
			]
		}
		evalV2editor?.setCode(expr)
		$app = $app
	}

	$: if (componentInput == undefined) {
		//@ts-ignore
		componentInput = {
			type: 'static',
			value: undefined
		}
	}

	function closeConnection() {
		dispatch('closeConnection')
		$connectingInput = {
			opened: false,
			hoveredComponent: undefined,
			input: undefined,
			onConnect: () => {}
		}
	}

	function openConnection() {
		dispatch('openConnection')
		$connectingInput = {
			opened: true,
			input: undefined,
			hoveredComponent: undefined,
			onConnect: applyConnection
		}
	}
</script>

{#if !(resourceOnly && (fieldType !== 'object' || !format?.startsWith('resource-')))}
	<div class={classNames('flex gap-1', 'flex-col')}>
		<div class="flex justify-between items-end">
			<div class="flex flex-row gap-4 items-center">
				<div class="flex items-center">
					<span class="!text-2xs font-semibold text-ellipsis text-primary">
						{customTitle
							? customTitle
							: shouldCapitalize
							? capitalize(addWhitespaceBeforeCapitals(key))
							: key}
					</span>
					{#if loading}
						<Loader2 size={14} class="animate-spin ml-2" />
					{/if}
					{#if tooltip || markdownTooltip}
						<Tooltip small {documentationLink} {markdownTooltip}>
							{tooltip}
						</Tooltip>
					{/if}
				</div>
				{#if displayType}
					<div class="text-xs text-tertiary mr-1">
						{fieldType === 'array' && subFieldType
							? `${fieldTypeToTsType(subFieldType)}[]`
							: fieldTypeToTsType(fieldType)}
					</div>
				{/if}
			</div>

			<div class={classNames('flex gap-x-2 gap-y-1 justify-end items-center')}>
				{#if componentInput?.type && allowTypeChange !== false}
					<ToggleButtonGroup
						class="h-7"
						bind:selected={componentInput.type}
						on:selected={(e) => {
							if (
								e.detail == 'evalv2' &&
								componentInput['value'] != undefined &&
								(componentInput['expr'] == '' || componentInput['expr'] == undefined)
							) {
								componentInput['expr'] = JSON.stringify(componentInput['value'])
							}

							if (shouldFormatExpression) {
								componentInput['expr'] = JSON.stringify(JSON.parse(componentInput['expr']), null, 4)
							}
						}}
						let:item
					>
						<ToggleButton value="static" icon={Pen} iconOnly tooltip="Static" {item} />
						{#if userInputEnabled}
							<ToggleButton value="user" icon={User} iconOnly tooltip="User Input" {item} />
						{/if}
						{#if fileUpload}
							<ToggleButton value="upload" icon={Upload} iconOnly tooltip="Upload" {item} />
						{/if}
						{#if componentInput?.type === 'connected'}
							<ToggleButton value="connected" icon={Plug2} iconOnly tooltip="Connect" {item} />
						{/if}
						{#if componentInput?.type === 'eval'}
							<ToggleButton
								value="eval"
								icon={FunctionSquare}
								iconOnly
								tooltip="Eval Legacy"
								{item}
							/>
						{/if}
						<ToggleButton value="evalv2" icon={FunctionSquare} iconOnly tooltip="Eval" {item} />
					</ToggleButtonGroup>
					<ConnectionButton {closeConnection} {openConnection} isOpen={!!$connectingInput.opened} />
				{/if}
			</div>
		</div>

		{#if componentInput?.type === 'connected'}
			<ConnectedInputEditor bind:componentInput />
		{:else if componentInput?.type === 'row'}
			<RowInputEditor bind:componentInput />
		{:else if componentInput?.type === 'static'}
			<div class={'w-full flex flex-row-reverse'}>
				<StaticInputEditor
					{id}
					{fieldType}
					{subFieldType}
					{selectOptions}
					{format}
					{placeholder}
					bind:componentInput
				/>
			</div>
		{:else if componentInput?.type === 'eval'}
			<EvalInputEditor {id} bind:componentInput />
		{:else if componentInput?.type === 'evalv2'}
			<EvalV2InputEditor
				{acceptSelf}
				field={key}
				bind:this={evalV2editor}
				{id}
				bind:componentInput
				{fixedOverflowWidgets}
				{recomputeOnInputChanged}
				{showOnDemandOnlyToggle}
				{securedContext}
			/>
		{:else if componentInput?.type === 'upload'}
			<UploadInputEditor bind:componentInput {fileUpload} />
		{:else if componentInput?.type === 'user'}
			<span class="text-2xs italic text-tertiary">Field's value is set by the user</span>
		{/if}
		{#if (componentInput?.type === 'evalv2' || componentInput?.type === 'connected' || componentInput?.type === 'user') && ((fieldType == 'object' && format?.startsWith('resource-') && format !== 'resource-s3_object') || fieldType == 'resource')}
			<div class="flex flex-row items-center">
				<Toggle
					size="xs"
					bind:checked={componentInput.allowUserResources}
					options={{
						left: 'static resource select only',
						right: 'resources from users allowed'
					}}
				/>
				<Tooltip
					>Apps are executed on behalf of publishers and by default cannot access viewer's
					resources. If the resource passed here as a reference does not come from a static
					'Resource Select' component (which will be whitelisted by the auto-generated policy), you
					need to toggle this.</Tooltip
				>
			</div>
		{/if}
	</div>
{/if}

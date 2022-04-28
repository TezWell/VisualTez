/**
 * This file is an override of {@link https://github.com/google/blockly/blob/352b4344bd95bba68ef8cfb6fb6485444279c832/core/inject.js}
 *
 * It replaces {@class WorkspaceSvg} with {@class VisualTezWorkspace} on method 'createMainWorkspace' to serve the application purposes.
 *
 * The file should be kept synchronized with the version at {@link https://github.com/google/blockly}.
 */

import Blockly from 'blockly';
import type { BlocklyOptions, Options } from 'src/typings/blockly';
import { VisualTezWorkspace } from './workspace';

/**
 * Inject a Blockly editor into the specified container element (usually a div).
 * @param {Element|string} container Containing element, or its ID,
 *     or a CSS selector.
 * @param {BlocklyOptions=} opt_options Optional dictionary of options.
 * @return {!WorkspaceSvg} Newly created main workspace.
 * @alias Blockly.inject
 */
export const inject = function (container: Element | string, opt_options: BlocklyOptions) {
    if (typeof container === 'string') {
        container = document.getElementById(container)! || document.querySelector(container);
    }
    // Verify that the container is in document.
    if (!container || !Blockly.utils.dom.containsNode(document, container)) {
        throw Error('Error: container is not in current document.');
    }
    const options = new Blockly.Options(opt_options || /** @type {!BlocklyOptions} */ {});
    const subContainer = /** @type {!HTMLDivElement} */ document.createElement('div');
    subContainer.className = 'injectionDiv';
    subContainer.tabIndex = 0;
    Blockly.utils.aria.setState(subContainer, Blockly.utils.aria.State.LABEL, Blockly.Msg['WORKSPACE_ARIA_LABEL']);

    container.appendChild(subContainer);
    const svg = createDom(subContainer, options);

    // Create surfaces for dragging things. These are optimizations
    // so that the browser does not repaint during the drag.
    const blockDragSurface = new Blockly.BlockDragSurfaceSvg(subContainer);

    const workspaceDragSurface = new Blockly.WorkspaceDragSurfaceSvg(subContainer);

    const workspace = createMainWorkspace(svg, options, blockDragSurface, workspaceDragSurface);

    init(workspace);

    // Keep focus on the first workspace so entering keyboard navigation looks
    // correct.
    Blockly.common.setMainWorkspace(workspace);

    Blockly.common.svgResize(workspace);

    subContainer.addEventListener('focusin', function () {
        Blockly.common.setMainWorkspace(workspace);
    });

    return workspace;
};

/**
 * Create the SVG image.
 * @param {!Element} container Containing element.
 * @param {!Options} options Dictionary of options.
 * @return {!Element} Newly created SVG image.
 */
const createDom = function (container: Element, options: Options) {
    // Sadly browsers (Chrome vs Firefox) are currently inconsistent in laying
    // out content in RTL mode.  Therefore Blockly forces the use of LTR,
    // then manually positions content in RTL as needed.
    container.setAttribute('dir', 'LTR');

    // Load CSS.
    Blockly.Css.inject(options.hasCss, options.pathToMedia);

    // Build the SVG dom.
    /*
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:html="http://www.w3.org/1999/xhtml"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      class="blocklySvg">
      ...
    </svg>
    */
    const svg = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.SVG,
        {
            xmlns: Blockly.utils.dom.SVG_NS,
            'xmlns:html': Blockly.utils.dom.HTML_NS,
            'xmlns:xlink': Blockly.utils.dom.XLINK_NS,
            version: '1.1',
            class: 'blocklySvg',
            tabindex: '0',
        },
        container,
    );
    /*
    <defs>
      ... filters go here ...
    </defs>
    */
    const defs = Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.DEFS, {}, svg);
    // Each filter/pattern needs a unique ID for the case of multiple Blockly
    // instances on a page.  Browser behaviour becomes undefined otherwise.
    // https://neil.fraser.name/news/2015/11/01/
    const rnd = String(Math.random()).substring(2);

    options.gridPattern = Blockly.Grid.createDom(rnd, options.gridOptions, defs);
    return svg;
};

/**
 * Create a main workspace and add it to the SVG.
 * @param {!Element} svg SVG element with pattern defined.
 * @param {!Options} options Dictionary of options.
 * @param {!BlockDragSurfaceSvg} blockDragSurface Drag surface SVG
 *     for the blocks.
 * @param {!WorkspaceDragSurfaceSvg} workspaceDragSurface Drag surface
 *     SVG for the workspace.
 * @return {!VisualTezWorkspace} Newly created main workspace.
 */
const createMainWorkspace = function (svg: any, options: any, blockDragSurface: any, workspaceDragSurface: any) {
    options.parentWorkspace = null;
    const mainWorkspace = new VisualTezWorkspace(options, blockDragSurface, workspaceDragSurface);
    const wsOptions = mainWorkspace.options;
    mainWorkspace.scale = wsOptions.zoomOptions.startScale;
    svg.appendChild(mainWorkspace.createDom('blocklyMainBackground'));

    // Set the theme name and renderer name onto the injection div.
    Blockly.utils.dom.addClass(mainWorkspace.getInjectionDiv(), mainWorkspace.getRenderer().getClassName());
    Blockly.utils.dom.addClass(mainWorkspace.getInjectionDiv(), mainWorkspace.getTheme().getClassName());

    if (!wsOptions.hasCategories && wsOptions.languageTree) {
        // Add flyout as an <svg> that is a sibling of the workspace SVG.
        const flyout = mainWorkspace.addFlyout(Blockly.utils.Svg.SVG);
        Blockly.utils.dom.insertAfter(flyout, svg);
    }
    if (wsOptions.hasTrashcan) {
        mainWorkspace.addTrashcan();
    }
    if (wsOptions.zoomOptions && wsOptions.zoomOptions.controls) {
        mainWorkspace.addZoomControls();
    }
    // Register the workspace svg as a UI component.
    mainWorkspace.getThemeManager().subscribe(svg, 'workspaceBackgroundColour', 'background-color');

    // A null translation will also apply the correct initial scale.
    mainWorkspace.translate(0, 0);

    mainWorkspace.addChangeListener(Blockly.bumpObjects.bumpIntoBoundsHandler(mainWorkspace));

    // The SVG is now fully assembled.
    Blockly.common.svgResize(mainWorkspace);
    Blockly.WidgetDiv.createDom();
    Blockly.DropDownDiv.createDom();
    Blockly.Tooltip.createDom();
    return mainWorkspace;
};

/**
 * Initialize Blockly with various handlers.
 * @param {!WorkspaceSvg} mainWorkspace Newly created main workspace.
 */
const init = function (mainWorkspace: any) {
    const options = mainWorkspace.options;
    const svg = mainWorkspace.getParentSvg();

    // Suppress the browser's context menu.
    Blockly.browserEvents.conditionalBind(
        /** @type {!Element} */ svg.parentNode,
        'contextmenu',
        null,
        function (e: any) {
            if (!Blockly.browserEvents.isTargetInput(e)) {
                e.preventDefault();
            }
        },
    );

    const workspaceResizeHandler = Blockly.browserEvents.conditionalBind(window, 'resize', null, function () {
        mainWorkspace.hideChaff(true);
        Blockly.common.svgResize(mainWorkspace);
        Blockly.bumpObjects.bumpTopObjectsIntoBounds(mainWorkspace);
    });
    mainWorkspace.setResizeHandlerWrapper(workspaceResizeHandler);

    bindDocumentEvents();

    if (options.languageTree) {
        const toolbox = mainWorkspace.getToolbox();
        const flyout = mainWorkspace.getFlyout(true);
        if (toolbox) {
            toolbox.init();
        } else if (flyout) {
            // Build a fixed flyout with the root blocks.
            flyout.init(mainWorkspace);
            flyout.show(options.languageTree);
            if (typeof flyout.scrollToStart === 'function') {
                flyout.scrollToStart();
            }
        }
    }

    if (options.hasTrashcan) {
        mainWorkspace.trashcan.init();
    }
    if (options.zoomOptions && options.zoomOptions.controls) {
        mainWorkspace.zoomControls_.init();
    }

    if (options.moveOptions && options.moveOptions.scrollbars) {
        const horizontalScroll = options.moveOptions.scrollbars === true || !!options.moveOptions.scrollbars.horizontal;
        const verticalScroll = options.moveOptions.scrollbars === true || !!options.moveOptions.scrollbars.vertical;
        mainWorkspace.scrollbar = new Blockly.ScrollbarPair(
            mainWorkspace,
            horizontalScroll,
            verticalScroll,
            'blocklyMainWorkspaceScrollbar',
        );
        mainWorkspace.scrollbar.resize();
    } else {
        mainWorkspace.setMetrics({ x: 0.5, y: 0.5 });
    }

    // Load the sounds.
    if (options.hasSounds) {
        loadSounds(options.pathToMedia, mainWorkspace);
    }
};

/**
 * Handle a key-down on SVG drawing surface. Does nothing if the main workspace
 * is not visible.
 * @param {!KeyboardEvent} e Key down event.
 */
// TODO (https://github.com/google/blockly/issues/1998) handle cases where there
// are multiple workspaces and non-main workspaces are able to accept input.
const onKeyDown = function (e: any) {
    const mainWorkspace = /** @type {!WorkspaceSvg} */ Blockly.common.getMainWorkspace();
    if (!mainWorkspace) {
        return;
    }

    if (Blockly.browserEvents.isTargetInput(e) || (mainWorkspace.rendered && !mainWorkspace.isVisible())) {
        // When focused on an HTML text input widget, don't trap any keys.
        // Ignore keypresses on rendered workspaces that have been explicitly
        // hidden.
        return;
    }
    Blockly.ShortcutRegistry.registry.onKeyDown(mainWorkspace, e);
};

/**
 * Whether event handlers have been bound. Document event handlers will only
 * be bound once, even if Blockly is destroyed and reinjected.
 * @type {boolean}
 */
let documentEventsBound = false;

/**
 * Bind document events, but only once.  Destroying and reinjecting Blockly
 * should not bind again.
 * Bind events for scrolling the workspace.
 * Most of these events should be bound to the SVG's surface.
 * However, 'mouseup' has to be on the whole document so that a block dragged
 * out of bounds and released will know that it has been released.
 * Also, 'keydown' has to be on the whole document since the browser doesn't
 * understand a concept of focus on the SVG image.
 */
const bindDocumentEvents = function () {
    if (!documentEventsBound) {
        Blockly.browserEvents.conditionalBind(document, 'scroll', null, function () {
            const workspaces = Blockly.Workspace.getAll();
            for (let i = 0, workspace; (workspace = workspaces[i]); i++) {
                if (workspace.updateInverseScreenCTM) {
                    workspace.updateInverseScreenCTM();
                }
            }
        });
        Blockly.browserEvents.conditionalBind(document, 'keydown', null, onKeyDown);
        // longStop needs to run to stop the context menu from showing up.  It
        // should run regardless of what other touch event handlers have run.
        Blockly.browserEvents.bind(document, 'touchend', null, Blockly.Touch.longStop);
        Blockly.browserEvents.bind(document, 'touchcancel', null, Blockly.Touch.longStop);
        // Some iPad versions don't fire resize after portrait to landscape change.
        if (Blockly.utils.userAgent.IPAD) {
            Blockly.browserEvents.conditionalBind(window, 'orientationchange', document, function () {
                // TODO (#397): Fix for multiple Blockly workspaces.
                Blockly.common.svgResize(/** @type {!WorkspaceSvg} */ Blockly.common.getMainWorkspace());
            });
        }
    }
    documentEventsBound = true;
};

/**
 * Load sounds for the given workspace.
 * @param {string} pathToMedia The path to the media directory.
 * @param {!WorkspaceSvg} workspace The workspace to load sounds for.
 */
const loadSounds = function (pathToMedia: any, workspace: any) {
    const audioMgr = workspace.getAudioManager();
    audioMgr.load([pathToMedia + 'click.mp3', pathToMedia + 'click.wav', pathToMedia + 'click.ogg'], 'click');
    audioMgr.load(
        [pathToMedia + 'disconnect.wav', pathToMedia + 'disconnect.mp3', pathToMedia + 'disconnect.ogg'],
        'disconnect',
    );
    audioMgr.load([pathToMedia + 'delete.mp3', pathToMedia + 'delete.ogg', pathToMedia + 'delete.wav'], 'delete');

    // Bind temporary hooks that preload the sounds.
    const soundBinds: any[] = [];
    const unbindSounds = function () {
        while (soundBinds.length) {
            Blockly.browserEvents.unbind(soundBinds.pop());
        }
        audioMgr.preload();
    };

    // These are bound on mouse/touch events with
    // Blockly.browserEvents.conditionalBind, so they restrict the touch
    // identifier that will be recognized.  But this is really something that
    // happens on a click, not a drag, so that's not necessary.

    // Android ignores any sound not loaded as a result of a user action.
    soundBinds.push(Blockly.browserEvents.conditionalBind(document, 'mousemove', null, unbindSounds, true));
    soundBinds.push(Blockly.browserEvents.conditionalBind(document, 'touchstart', null, unbindSounds, true));
};

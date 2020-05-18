const isCurrentWidget = (item: Dashboard{{PREV_VERSION}}.BoxItem): item is CurrentDashboard.WidgetItem =>
  item.type === 'widget'

const upgradeConfig = (
  config: Dashboard{{PREV_VERSION}}.Config,
  widgetUpgrader: (widgetItem: Dashboard{{PREV_VERSION}}.WidgetItem) => CurrentDashboard.WidgetItem
): CurrentDashboard.Config => {
  const upgradeItem = (item: Dashboard{{PREV_VERSION}}.BoxItem): CurrentDashboard.BoxItem => {
    if (item.type === 'switch') {
      return {
        ...item,
        displays: item.displays.map(widgets => widgets.map(upgradeItem).filter(isCurrentWidget)),
      }
    }

    if (item.type === 'grid') {
      return {
        ...item,
        grid: {
          ...item.grid,
          items: item.grid.items.map(row =>
            row.map(column => column.map(upgradeItem).filter(isCurrentWidget))
          ),
        },
      }
    }

    return widgetUpgrader(item)
  }

  return Object.keys(config).reduce((newConfig, key) => {
    const items = config[key]

    return {
      ...newConfig,
      [key]: items.map(upgradeItem).filter(isDefined),
    }
  }, {})
}

const isDashboard{{PREV_VERSION}}Widget = (item: Dashboard{{PREV_VERSION}}.BoxItem): item is Dashboard{{PREV_VERSION}}.WidgetItem =>
  item.type === 'widget'

const downgradeConfig = (
  config: CurrentDashboard.Config,
  widgetDowngrader: (widgetItem: CurrentDashboard.WidgetItem) => Dashboard{{PREV_VERSION}}.WidgetItem
): Dashboard{{PREV_VERSION}}.Config => {
  const downgradeItem = (item: CurrentDashboard.BoxItem): Dashboard{{PREV_VERSION}}.BoxItem => {
    if (item.type === 'switch') {
      return {
        ...item,
        displays: item.displays.map(widgets =>
          widgets.map(downgradeItem).filter(isDashboard{{PREV_VERSION}}Widget)
        ),
      }
    }

    if (item.type === 'grid') {
      return {
        ...item,
        grid: {
          ...item.grid,
          items: item.grid.items.map(row =>
            row.map(column => column.map(downgradeItem).filter(isDashboard{{PREV_VERSION}}Widget))
          ),
        },
      }
    }

    return widgetDowngrader(item)
  }

  return Object.keys(config).reduce((newConfig, key) => {
    const items = config[key]

    return {
      ...newConfig,
      [key]: items.map(downgradeItem).filter(isDefined),
    }
  }, {})
}
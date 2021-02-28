import ts, { server as tsserver } from 'typescript/lib/tsserverlibrary'

const init = ({ typescript: tsInstance }: { typescript: typeof ts }) => {
  const create = (info: tsserver.PluginCreateInfo) => {
    const log = (msg: string) => {
      if (info.config.verbose) {
        info.project.projectService.logger.info(msg)
      }
    }

    log('I am alive!')

    const resolveModuleNames = info.languageServiceHost.resolveModuleNames.bind(info.languageServiceHost)
    info.languageServiceHost.resolveModuleNames = (
      moduleNames,
      containingFile,
      reusedNames,
      redirectedReference,
      options
    ): ts.ResolvedModule[] => {
      log('resolveModuleNames!')
      return moduleNames.map<ts.ResolvedModule>((moduleName) => {
        const resolvedModule = resolveModuleNames([moduleName], containingFile, reusedNames, redirectedReference, options)[0]
        log(`${moduleName}: ${JSON.stringify(resolvedModule)}`)
        return resolvedModule
      })
    }

    return info.languageService
  }

  return { create }
}

export default init

package com.hoffmeyer.frontendarchitecture.webcomponent

import com.moowork.gradle.node.npm.NpmTask
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.tasks.Delete

class WebcomponentPlugin implements Plugin<Project> {

    @Override
    void apply(Project project) {
        project.apply plugin: 'com.moowork.node'

        project.node {
            download = true
            version = '10.16.0'
            npmVersion = '6.9.0'
            workDir = project.file("$project.buildDir/nodejs")
            npmWorkDir = project.file("$project.buildDir/npm")
            nodeModulesDir = project.file("src/main/html")
        }

        project.tasks.create('npmBuild', NpmTask) { NpmTask task ->
            task.dependsOn 'npm_install'
            //script = file('src/main/html')
            task.args = ['run-script', 'build']
            task.inputs.files project.fileTree(dir: 'src/main/html')
                    .exclude('dist/')
                    .exclude('node_modules/')

            task.outputs.files project.fileTree(dir: 'build/dist')

        }

        project.tasks.create('cleanDist', Delete) {Delete task ->
            task.delete project.file('build')
            task.delete project.file('src/main/html/npm-debug.html')
            task.delete project.file('src/main/html/dist')
            task.delete project.file('src/main/html/node_modules')
        }

    }
}

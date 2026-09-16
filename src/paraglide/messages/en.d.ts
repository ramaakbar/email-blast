/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_NextInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_DeleteInputs */
/** @typedef {{}} Common_RetryInputs */
/** @typedef {{}} Common_ResumeInputs */
/** @typedef {{}} Common_PauseInputs */
/** @typedef {{}} Common_PrevInputs */
/** @typedef {{}} Common_ClearInputs */
/** @typedef {{}} Common_DismissInputs */
/** @typedef {{}} Common_BrowseInputs */
/** @typedef {{}} Common_LoadingInputs */
/** @typedef {{}} Common_SavedInputs */
/** @typedef {{}} Common_SavingInputs */
/** @typedef {{}} Common_DeletingInputs */
/** @typedef {{}} Common_TestingInputs */
/** @typedef {{}} Common_Closedetails1Inputs */
/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotload2Inputs */
/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotsave2Inputs */
/** @typedef {{}} Common_Retryfailures1Inputs */
/** @typedef {{}} Common_CloseInputs */
/** @typedef {{}} Nav_ImportInputs */
/** @typedef {{}} Nav_RecipientsInputs */
/** @typedef {{}} Nav_TemplatesInputs */
/** @typedef {{}} Nav_LogsInputs */
/** @typedef {{}} Nav_SettingsInputs */
/** @typedef {{}} Nav_GenerateInputs */
/** @typedef {{}} Nav_SendInputs */
/** @typedef {{}} App_Backendunreachable1Inputs */
/** @typedef {{}} Welcome_TitleInputs */
/** @typedef {{}} Welcome_SubtitleInputs */
/** @typedef {{}} Welcome_Checkinglibreoffice2Inputs */
/** @typedef {{}} Welcome_Libreofficepurpose2Inputs */
/** @typedef {{}} Welcome_Libreofficefound2Inputs */
/** @typedef {{}} Welcome_Libreofficemissing2Inputs */
/** @typedef {{}} Welcome_Libreofficemissingdetail3Inputs */
/** @typedef {{}} Welcome_Installwith1Inputs */
/** @typedef {{}} Welcome_Downloadfrom1Inputs */
/** @typedef {{}} Welcome_Checkagain1Inputs */
/** @typedef {{}} Welcome_Templatesfolder1Inputs */
/** @typedef {{}} Welcome_Outputfolder1Inputs */
/** @typedef {{}} Welcome_Settingup1Inputs */
/** @typedef {{}} Welcome_Getstarted1Inputs */
/** @typedef {{}} Status_PendingInputs */
/** @typedef {{}} Status_SendingInputs */
/** @typedef {{}} Status_PausedInputs */
/** @typedef {{}} Status_CompletedInputs */
/** @typedef {{}} Status_CancelledInputs */
/** @typedef {{}} Status_FailedInputs */
/** @typedef {{}} Status_SkippedInputs */
/** @typedef {{}} Status_SentInputs */
/** @typedef {{}} Status_GeneratingInputs */
/** @typedef {{}} Status_GeneratedInputs */
/** @typedef {{}} Settingspage_Title1Inputs */
/** @typedef {{}} Settingspage_Description1Inputs */
/** @typedef {{}} Settingspage_Ratelimiting2Inputs */
/** @typedef {{}} Settingspage_Ratelimitingdescription3Inputs */
/** @typedef {{ ms: NonNullable<unknown> }} Settingspage_Msperemail3Inputs */
/** @typedef {{}} Settingspage_Delaybetweenemails3Inputs */
/** @typedef {{}} Settingspage_Defaultfolders2Inputs */
/** @typedef {{}} Settingspage_Defaultfoldersdescription3Inputs */
/** @typedef {{}} Settingspage_Templatesfolder2Inputs */
/** @typedef {{}} Settingspage_Outputfolder2Inputs */
/** @typedef {{}} Settingspage_About1Inputs */
/** @typedef {{}} Settingspage_App1Inputs */
/** @typedef {{}} Settingspage_Version1Inputs */
/** @typedef {{}} Settingspage_Data1Inputs */
/** @typedef {{}} Settingspage_Storedlocally2Inputs */
/** @typedef {{}} Settingspage_Language1Inputs */
/** @typedef {{}} Settingspage_Languagedescription2Inputs */
/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondone4Inputs */
/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondother4Inputs */
/** @typedef {{}} Settingspage_Couldnotload3Inputs */
/** @typedef {{}} Smtp_TitleInputs */
/** @typedef {{}} Smtp_DescriptionInputs */
/** @typedef {{}} Smtp_Addprofile1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Profilesaved1Inputs */
/** @typedef {{}} Smtp_Profiledeleted1Inputs */
/** @typedef {{}} Smtp_Couldnotsaveprofile3Inputs */
/** @typedef {{}} Smtp_Couldnotdeleteprofile3Inputs */
/** @typedef {{}} Smtp_Couldnotloadprofiles3Inputs */
/** @typedef {{}} Smtp_Loadingprofiles1Inputs */
/** @typedef {{}} Smtp_Noprofilesyet2Inputs */
/** @typedef {{}} Smtp_Noprofilesdescription2Inputs */
/** @typedef {{}} Smtp_Testconnection1Inputs */
/** @typedef {{}} Smtp_Connectionok1Inputs */
/** @typedef {{}} Smtp_ConnectedInputs */
/** @typedef {{}} Smtp_Connectionfailed1Inputs */
/** @typedef {{}} Smtp_Passwordnotset2Inputs */
/** @typedef {{}} Smtp_Addprofiletitle2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Editprofiletitle2Inputs */
/** @typedef {{}} Smtp_Createhint1Inputs */
/** @typedef {{}} Smtp_Edithint1Inputs */
/** @typedef {{}} Smtp_Profilename1Inputs */
/** @typedef {{}} Smtp_Smtphost1Inputs */
/** @typedef {{}} Smtp_PortInputs */
/** @typedef {{}} Smtp_Implicittls1Inputs */
/** @typedef {{}} Smtp_StarttlsInputs */
/** @typedef {{}} Smtp_UsernameInputs */
/** @typedef {{}} Smtp_Apppassword1Inputs */
/** @typedef {{}} Smtp_Leaveblanktokeep3Inputs */
/** @typedef {{}} Smtp_Gmailapppasswordhint3Inputs */
/** @typedef {{}} Smtp_Defaultsendername2Inputs */
/** @typedef {{}} Smtp_Defaultsenderaddress2Inputs */
/** @typedef {{}} Smtp_Replyto1Inputs */
/** @typedef {{}} Smtp_Identityhint1Inputs */
/** @typedef {{}} Smtp_Saveprofile1Inputs */
/** @typedef {{}} Smtp_Savechanges1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Deleteprofiletitle2Inputs */
/** @typedef {{}} Smtp_Deleteprofiledescription2Inputs */
/** @typedef {{}} Smtp_Passwordlabel1Inputs */
/** @typedef {{}} Compose_Steprecipients1Inputs */
/** @typedef {{}} Compose_Steptemplate1Inputs */
/** @typedef {{}} Compose_Stepmessage1Inputs */
/** @typedef {{}} Compose_Stepsmtp1Inputs */
/** @typedef {{}} Compose_Stepgenerate1Inputs */
/** @typedef {{}} Compose_Stepsend1Inputs */
/** @typedef {{}} Compose_Writesubjecttocontinue3Inputs */
/** @typedef {{}} Compose_Writebodytocontinue3Inputs */
/** @typedef {{}} Compose_Completesmtpdetails2Inputs */
/** @typedef {{}} Compose_Searchrecipients1Inputs */
/** @typedef {{}} Compose_Searchplaceholder1Inputs */
/** @typedef {{}} Compose_Filterbybatch2Inputs */
/** @typedef {{}} Compose_Allbatches1Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Compose_Batchoption1Inputs */
/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallmatchingtitle3Inputs */
/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallcount2Inputs */
/** @typedef {{}} Compose_Couldnotloadrecipients3Inputs */
/** @typedef {{}} Compose_Norecipientsyet2Inputs */
/** @typedef {{}} Compose_Norecipientsmatchfilter3Inputs */
/** @typedef {{}} Compose_Norecipientshint2Inputs */
/** @typedef {{}} Compose_Gotoimport2Inputs */
/** @typedef {{}} Compose_Trydifferentfilter2Inputs */
/** @typedef {{}} Compose_Selectallonpage3Inputs */
/** @typedef {{}} Compose_NameInputs */
/** @typedef {{}} Compose_EmailInputs */
/** @typedef {{}} Compose_PhoneInputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Selectrecipient1Inputs */
/** @typedef {{ selected: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Selectioncount1Inputs */
/** @typedef {{ page: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Pageof1Inputs */
/** @typedef {{}} Compose_Templatelabel1Inputs */
/** @typedef {{}} Compose_Choosetemplate1Inputs */
/** @typedef {{}} Compose_Notemplatesregistered2Inputs */
/** @typedef {{}} Compose_Registertemplatelink2Inputs */
/** @typedef {{}} Compose_Notemplatesregisteredhint3Inputs */
/** @typedef {{}} Compose_Requiredslots1Inputs */
/** @typedef {{}} Compose_Outputpattern1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allcovered1Inputs */
/** @typedef {{ missing: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Missingdatasummary2Inputs */
/** @typedef {{}} Compose_Missingdatahint2Inputs */
/** @typedef {{}} Compose_SubjectInputs */
/** @typedef {{ name: NonNullable<unknown>, instansi: NonNullable<unknown> }} Compose_Subjectplaceholder1Inputs */
/** @typedef {{}} Compose_Bodylabel1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Bodyplaceholder1Inputs */
/** @typedef {{}} Compose_Unknownslothint2Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Missingslottitle2Inputs */
/** @typedef {{}} Compose_Missingslothint2Inputs */
/** @typedef {{}} Compose_Livepreview1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Compose_Previewfor1Inputs */
/** @typedef {{}} Compose_Emailconnection1Inputs */
/** @typedef {{}} Compose_Savedprofile1Inputs */
/** @typedef {{}} Compose_Enterdetails1Inputs */
/** @typedef {{}} Compose_Chooseprofile1Inputs */
/** @typedef {{}} Compose_Nosavedprofileshint3Inputs */
/** @typedef {{}} Compose_Settingslink1Inputs */
/** @typedef {{}} Compose_HostInputs */
/** @typedef {{}} Compose_Portlabel1Inputs */
/** @typedef {{}} Compose_Usernamelabel1Inputs */
/** @typedef {{}} Compose_Apppasswordlabel2Inputs */
/** @typedef {{}} Compose_Saveasprofile2Inputs */
/** @typedef {{}} Compose_Profilenameplaceholder2Inputs */
/** @typedef {{}} Compose_Testconnectionbutton2Inputs */
/** @typedef {{}} Compose_Senderidentity1Inputs */
/** @typedef {{}} Compose_Sendername1Inputs */
/** @typedef {{}} Compose_Senderaddress1Inputs */
/** @typedef {{}} Compose_Replyto1Inputs */
/** @typedef {{ provider: NonNullable<unknown>, domain: NonNullable<unknown>, from: NonNullable<unknown> }} Compose_Senderdomainmismatch2Inputs */
/** @typedef {{ address: NonNullable<unknown> }} Compose_Senderdiffersfromprofile3Inputs */
/** @typedef {{}} Compose_Sendingrate1Inputs */
/** @typedef {{ ms: NonNullable<unknown> }} Compose_Sendingratems2Inputs */
/** @typedef {{}} Compose_Sendingratehint2Inputs */
/** @typedef {{}} Compose_Generationfailed1Inputs */
/** @typedef {{}} Compose_Connectionfailed1Inputs */
/** @typedef {{}} Compose_Choosetemplatefirst2Inputs */
/** @typedef {{}} Compose_Campaignsummary1Inputs */
/** @typedef {{}} Compose_RecipientsInputs */
/** @typedef {{}} Compose_TemplateInputs */
/** @typedef {{}} Compose_Outputfolder1Inputs */
/** @typedef {{}} Compose_Campaignsummaryhint2Inputs */
/** @typedef {{}} Compose_Generatepdfs1Inputs */
/** @typedef {{}} Compose_GeneratingInputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Oftotal1Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Generatedcounts1Inputs */
/** @typedef {{}} Compose_Tryagain1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allgenerated1Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedwithfailures2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Failedrecipientstitle2Inputs */
/** @typedef {{}} Compose_Spotcheck1Inputs */
/** @typedef {{ index: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Spotindex1Inputs */
/** @typedef {{}} Compose_Loadingpreview1Inputs */
/** @typedef {{}} Compose_Sendsummary1Inputs */
/** @typedef {{}} Compose_SenderInputs */
/** @typedef {{}} Compose_ConnectionInputs */
/** @typedef {{}} Compose_PacingInputs */
/** @typedef {{}} Compose_AttachmentsInputs */
/** @typedef {{}} Compose_Preparingsend1Inputs */
/** @typedef {{}} Compose_SendingInputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Sendcounts1Inputs */
/** @typedef {{}} Compose_Windingdowntitle2Inputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Cancelsendconfirm2Inputs */
/** @typedef {{}} Compose_Perrecipientlog2Inputs */
/** @typedef {{}} Compose_Waitingfirstemail2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Allemailssent2Inputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Sentwithfailures2Inputs */
/** @typedef {{}} Compose_Sendcancelled1Inputs */
/** @typedef {{ sent: NonNullable<unknown>, skipped: NonNullable<unknown> }} Compose_Cancelleddetail1Inputs */
/** @typedef {{}} Compose_RecipientInputs */
/** @typedef {{}} Compose_Rowskipped1Inputs */
/** @typedef {{}} Compose_Sendingfailed1Inputs */
/** @typedef {{}} Compose_Couldnotstartsend3Inputs */
/** @typedef {{}} Compose_Couldnotpausesend3Inputs */
/** @typedef {{}} Compose_Couldnotcancelsend3Inputs */
/** @typedef {{}} Compose_Couldnotretryfailures3Inputs */
/** @typedef {{}} Compose_Sendjobnolongerexists4Inputs */
/** @typedef {{}} Compose_Couldnotresumesend3Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountone3Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountother3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleone3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintone3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountother2Inputs */
/** @typedef {{}} Compose_Apppasswordplaceholder2Inputs */
/** @typedef {{}} Compose_Replytoplaceholder2Inputs */
/** @typedef {{}} Templates_TitleInputs */
/** @typedef {{}} Templates_Addtemplate1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Templateregistered1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Templatesaved1Inputs */
/** @typedef {{}} Templates_Templatedeleted1Inputs */
/** @typedef {{}} Templates_Couldnotregister2Inputs */
/** @typedef {{}} Templates_Couldnotsave2Inputs */
/** @typedef {{}} Templates_Couldnotdelete2Inputs */
/** @typedef {{}} Templates_Couldnotload2Inputs */
/** @typedef {{}} Templates_Loadingtemplates1Inputs */
/** @typedef {{}} Templates_Notemplatesyet2Inputs */
/** @typedef {{}} Templates_Notemplateshint2Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Templates_Unsupportedfile1Inputs */
/** @typedef {{}} Templates_RegisteredInputs */
/** @typedef {{}} Templates_SlotsInputs */
/** @typedef {{}} Templates_Noslotsdeclared2Inputs */
/** @typedef {{}} Templates_Outputpatternhint2Inputs */
/** @typedef {{}} Templates_Editexternallyhint2Inputs */
/** @typedef {{}} Templates_EditInputs */
/** @typedef {{}} Templates_Addtitle1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Edittitle1Inputs */
/** @typedef {{}} Templates_Templatename1Inputs */
/** @typedef {{}} Templates_ScanningInputs */
/** @typedef {{}} Templates_Rescanfromfile2Inputs */
/** @typedef {{}} Templates_Rescanconfirm1Inputs */
/** @typedef {{}} Templates_Replaceslots1Inputs */
/** @typedef {{}} Templates_Keepmyslots2Inputs */
/** @typedef {{ placeholders: NonNullable<unknown> }} Templates_Docxslotshint2Inputs */
/** @typedef {{}} Templates_Imageslotshint2Inputs */
/** @typedef {{}} Templates_Couldnotscan2Inputs */
/** @typedef {{}} Templates_Slotscanbetyped3Inputs */
/** @typedef {{ index: NonNullable<unknown> }} Templates_Slotaria1Inputs */
/** @typedef {{ index: NonNullable<unknown> }} Templates_Removeslotaria2Inputs */
/** @typedef {{}} Templates_Addslot1Inputs */
/** @typedef {{}} Templates_Outputpatternfield2Inputs */
/** @typedef {{ no: NonNullable<unknown>, name: NonNullable<unknown> }} Templates_Outputpatternplaceholder2Inputs */
/** @typedef {{}} Templates_Registertemplate1Inputs */
/** @typedef {{}} Templates_Savechanges1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Templates_Deletetitle1Inputs */
/** @typedef {{}} Templates_Deletedescription1Inputs */
/** @typedef {{}} Templates_Thistemplate1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredother2Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountother2Inputs */
/** @typedef {{}} Templates_Slotlayouttitle2Inputs */
/** @typedef {{}} Templates_Slotlayouthint2Inputs */
/** @typedef {{}} Templates_Slotlayoutdone2Inputs */
/** @typedef {{}} Templates_Slotlayoutimagefailed3Inputs */
/** @typedef {{}} Templates_Positiontextonimage3Inputs */
/** @typedef {{}} Templates_Slotx1Inputs */
/** @typedef {{}} Templates_Sloty1Inputs */
/** @typedef {{}} Templates_Slotfontsize2Inputs */
/** @typedef {{}} Templates_Slotmaxwidth2Inputs */
/** @typedef {{}} Templates_Slotmaxwidthauto3Inputs */
/** @typedef {{}} Templates_Slotcolor1Inputs */
/** @typedef {{}} Templates_Slotalign1Inputs */
/** @typedef {{}} Templates_Slotalignleft2Inputs */
/** @typedef {{}} Templates_Slotaligncenter2Inputs */
/** @typedef {{}} Templates_Slotalignright2Inputs */
/** @typedef {{}} Templates_Slotfontface2Inputs */
/** @typedef {{}} Templates_Slotfontfacedefault3Inputs */
/** @typedef {{}} Templates_Addfont1Inputs */
/** @typedef {{ family: NonNullable<unknown> }} Templates_Fontadded1Inputs */
/** @typedef {{}} Templates_Fontaddfailed2Inputs */
/** @typedef {{}} Templates_Fontlistfailed2Inputs */
/** @typedef {{}} Importpage_Title1Inputs */
/** @typedef {{}} Importpage_Description1Inputs */
/** @typedef {{}} Importpage_Allowduplicates2Inputs */
/** @typedef {{}} Importpage_Allowduplicateshint3Inputs */
/** @typedef {{}} Importpage_Importanotherfile3Inputs */
/** @typedef {{}} Importpage_Dragdrophint3Inputs */
/** @typedef {{}} Importpage_Fileformathint3Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Parsing1Inputs */
/** @typedef {{}} Importpage_Importcomplete2Inputs */
/** @typedef {{}} Importpage_Gotorecipients3Inputs */
/** @typedef {{}} Importpage_Couldnotread3Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Notexcelfile3Inputs */
/** @typedef {{}} Importpage_Couldnotcommit3Inputs */
/** @typedef {{}} Importpage_Preview1Inputs */
/** @typedef {{ fileName: NonNullable<unknown>, shown: NonNullable<unknown>, total: NonNullable<unknown> }} Importpage_Previewrows2Inputs */
/** @typedef {{}} Importpage_Columnmapping2Inputs */
/** @typedef {{}} Importpage_Columnmappinghint3Inputs */
/** @typedef {{ column: NonNullable<unknown> }} Importpage_Columnrolearia3Inputs */
/** @typedef {{}} Importpage_Resetmapping2Inputs */
/** @typedef {{}} Importpage_Selectnamecolumn3Inputs */
/** @typedef {{}} Importpage_Importing1Inputs */
/** @typedef {{}} Importpage_Importrecipients2Inputs */
/** @typedef {{}} Importpage_Nodatarows3Inputs */
/** @typedef {{}} Importpage_Rolename2Inputs */
/** @typedef {{}} Importpage_Roleemail2Inputs */
/** @typedef {{}} Importpage_Rolephone2Inputs */
/** @typedef {{}} Importpage_Rolemetadata2Inputs */
/** @typedef {{}} Importpage_Roleskip2Inputs */
/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailone4Inputs */
/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailother4Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameone5Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameother5Inputs */
/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastone3Inputs */
/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingone4Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingother4Inputs */
/** @typedef {{}} Importpage_Gotogenerate3Inputs */
/** @typedef {{}} Importpage_Roletemplate2Inputs */
/** @typedef {{}} Recipients_TitleInputs */
/** @typedef {{}} Recipients_Couldnotdelete2Inputs */
/** @typedef {{}} Recipients_Deleteselected1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deleteselectedcount2Inputs */
/** @typedef {{}} Recipients_Searchplaceholder1Inputs */
/** @typedef {{}} Recipients_Searcharia1Inputs */
/** @typedef {{}} Recipients_Filterbybatch2Inputs */
/** @typedef {{}} Recipients_Allbatches1Inputs */
/** @typedef {{}} Recipients_Couldnotload2Inputs */
/** @typedef {{}} Recipients_Loadingrecipients1Inputs */
/** @typedef {{}} Recipients_Norecipientsyet2Inputs */
/** @typedef {{}} Recipients_Norecipientshint2Inputs */
/** @typedef {{}} Recipients_Gotoimport2Inputs */
/** @typedef {{}} Recipients_Nomatchfilters2Inputs */
/** @typedef {{}} Recipients_Nomatchhint2Inputs */
/** @typedef {{}} Recipients_Clearfilters1Inputs */
/** @typedef {{ from: NonNullable<unknown>, to: NonNullable<unknown>, total: NonNullable<unknown> }} Recipients_Showingrange1Inputs */
/** @typedef {{}} Recipients_PreviousInputs */
/** @typedef {{}} Recipients_NextInputs */
/** @typedef {{ page: NonNullable<unknown>, count: NonNullable<unknown> }} Recipients_Pageof1Inputs */
/** @typedef {{}} Recipients_Selectallonpage3Inputs */
/** @typedef {{}} Recipients_NameInputs */
/** @typedef {{}} Recipients_EmailInputs */
/** @typedef {{}} Recipients_PhoneInputs */
/** @typedef {{}} Recipients_Importbatch1Inputs */
/** @typedef {{}} Recipients_ImportedInputs */
/** @typedef {{ name: NonNullable<unknown> }} Recipients_Selectrecipient1Inputs */
/** @typedef {{}} Recipients_Noemailaddress2Inputs */
/** @typedef {{}} Recipients_Customfields1Inputs */
/** @typedef {{}} Recipients_Nocustomfields2Inputs */
/** @typedef {{}} Recipients_Deletedescription1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryone3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleother2Inputs */
/** @typedef {{}} Recipients_EditInputs */
/** @typedef {{}} Recipients_Edittitle1Inputs */
/** @typedef {{}} Recipients_UpdatedInputs */
/** @typedef {{}} Recipients_Couldnotupdate2Inputs */
/** @typedef {{}} Recipients_Namerequired1Inputs */
/** @typedef {{}} Recipients_Emailmustcontainat3Inputs */
/** @typedef {{}} Logs_TitleInputs */
/** @typedef {{}} Logs_DescriptionInputs */
/** @typedef {{}} Logs_Filterbystatus2Inputs */
/** @typedef {{}} Logs_Allstatuses1Inputs */
/** @typedef {{}} Logs_FromInputs */
/** @typedef {{}} Logs_ToInputs */
/** @typedef {{}} Logs_Jobscreatedfrom2Inputs */
/** @typedef {{}} Logs_Jobscreatedupto3Inputs */
/** @typedef {{}} Logs_Couldnotload2Inputs */
/** @typedef {{}} Logs_Loadinglogs1Inputs */
/** @typedef {{}} Logs_Nojobsmatchfilters3Inputs */
/** @typedef {{}} Logs_Nojobshint2Inputs */
/** @typedef {{}} Logs_Nosendjobsyet3Inputs */
/** @typedef {{}} Logs_Nosendjobshint3Inputs */
/** @typedef {{}} Logs_StatusInputs */
/** @typedef {{}} Logs_SubjectInputs */
/** @typedef {{}} Logs_TemplateInputs */
/** @typedef {{}} Logs_Sentfailedskipped2Inputs */
/** @typedef {{}} Logs_StartedInputs */
/** @typedef {{}} Logs_DurationInputs */
/** @typedef {{ sent: NonNullable<unknown>, total: NonNullable<unknown> }} Logs_Pausedprogress1Inputs */
/** @typedef {{}} Logs_ResumingInputs */
/** @typedef {{}} Jobdetail_Alllogs2Inputs */
/** @typedef {{}} Jobdetail_Jobdetail2Inputs */
/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, skipped: NonNullable<unknown> }} Jobdetail_Counts1Inputs */
/** @typedef {{}} Jobdetail_Resume1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Jobdetail_Retryallfailures3Inputs */
/** @typedef {{}} Jobdetail_Template1Inputs */
/** @typedef {{}} Jobdetail_Smtp1Inputs */
/** @typedef {{}} Jobdetail_Sender1Inputs */
/** @typedef {{}} Jobdetail_Startedduration2Inputs */
/** @typedef {{}} Jobdetail_Deletedprofile2Inputs */
/** @typedef {{}} Jobdetail_Inline1Inputs */
/** @typedef {{}} Jobdetail_Recipient1Inputs */
/** @typedef {{}} Jobdetail_Noemailaddress3Inputs */
/** @typedef {{}} Jobdetail_Error1Inputs */
/** @typedef {{}} Jobdetail_Sentat2Inputs */
/** @typedef {{}} Jobdetail_Messageid2Inputs */
/** @typedef {{}} Jobdetail_Retry1Inputs */
/** @typedef {{}} Jobdetail_Searchplaceholder2Inputs */
/** @typedef {{}} Jobdetail_Searcharia2Inputs */
/** @typedef {{}} Jobdetail_Filterbystatus3Inputs */
/** @typedef {{}} Jobdetail_Loadingjob2Inputs */
/** @typedef {{}} Jobdetail_Couldnotload3Inputs */
/** @typedef {{}} Jobdetail_Jobnotfound3Inputs */
/** @typedef {{}} Jobdetail_Jobnotfoundhint4Inputs */
/** @typedef {{}} Jobdetail_Backtologs3Inputs */
/** @typedef {{}} Jobdetail_Nomatchsearch3Inputs */
/** @typedef {{}} Jobdetail_Nomatchhint3Inputs */
/** @typedef {{}} Jobdetail_Status1Inputs */
/** @typedef {{}} Jobdetail_Fixemail2Inputs */
/** @typedef {{}} Jobdetail_Fixemailtitle3Inputs */
/** @typedef {{}} Jobdetail_Recipientdeletednoedit4Inputs */
/** @typedef {{}} Jobdetail_Emailfixedretrying3Inputs */
/** @typedef {{}} Jobdetail_Couldnotfixemail4Inputs */
/** @typedef {{}} Send_TitleInputs */
/** @typedef {{}} Send_DescriptionInputs */
/** @typedef {{}} Send_Recipientsource1Inputs */
/** @typedef {{}} Send_Sourcefromjob2Inputs */
/** @typedef {{}} Send_Sourcefromjobhint3Inputs */
/** @typedef {{}} Send_Sourcefromlist2Inputs */
/** @typedef {{}} Send_Sourcefromlisthint3Inputs */
/** @typedef {{}} Send_Choosejob1Inputs */
/** @typedef {{}} Send_Nogeneratejobsyet3Inputs */
/** @typedef {{}} Send_Nogeneratejobshint3Inputs */
/** @typedef {{ template: NonNullable<unknown>, generated: NonNullable<unknown>, failed: NonNullable<unknown>, stamp: NonNullable<unknown> }} Send_Joboption1Inputs */
/** @typedef {{}} Send_Couldnotloadjobs3Inputs */
/** @typedef {{}} Send_Couldnotloadjob3Inputs */
/** @typedef {{}} Send_Jobrecipients1Inputs */
/** @typedef {{}} Send_Jobrecipientshint2Inputs */
/** @typedef {{}} Send_Filterall1Inputs */
/** @typedef {{}} Send_Filterwithattachment2Inputs */
/** @typedef {{}} Send_Filterwithoutattachment2Inputs */
/** @typedef {{}} Send_Attachmentfilteraria2Inputs */
/** @typedef {{}} Send_Generatestatus1Inputs */
/** @typedef {{}} Send_AttachmentInputs */
/** @typedef {{}} Send_Rowhasattachment2Inputs */
/** @typedef {{}} Send_Rownoattachment2Inputs */
/** @typedef {{}} Send_Failedgeneratetitle2Inputs */
/** @typedef {{}} Send_Norecipientsinjob3Inputs */
/** @typedef {{}} Send_Preflighthint1Inputs */
/** @typedef {{ with: NonNullable<unknown>, without: NonNullable<unknown> }} Send_Attachmentssummary1Inputs */
/** @typedef {{}} Send_Sendthese1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Send_Prefillretryone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Send_Prefillretryother2Inputs */
/** @typedef {{}} Send_Prefillreenterpassword2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Send_Prefilldeletedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Send_Prefilldeletedother2Inputs */
/** @typedef {{}} Sendjob_Selectrecipients2Inputs */
/** @typedef {{}} Sendjob_Writesubject2Inputs */
/** @typedef {{}} Sendjob_Writebody2Inputs */
/** @typedef {{}} Sendjob_Entersender2Inputs */
/** @typedef {{}} Sendjob_Chooseoneidentity3Inputs */
/** @typedef {{}} Sendjob_Norecipientsexist3Inputs */
/** @typedef {{}} Sendjob_Alreadysending2Inputs */
/** @typedef {{}} Sendjob_Anothersendactive3Inputs */
/** @typedef {{}} Sendjob_Stillpausing2Inputs */
/** @typedef {{}} Sendjob_Onlysendingcanpause4Inputs */
/** @typedef {{}} Sendjob_Onlypausedcanresume4Inputs */
/** @typedef {{}} Sendjob_Finishedcannotcancel3Inputs */
/** @typedef {{}} Sendjob_Onlyfinishedcanretry4Inputs */
/** @typedef {{}} Sendjob_Nofailedrecipients3Inputs */
/** @typedef {{}} Sendjob_Attachmentsmissingondisk4Inputs */
/** @typedef {{}} Sendjob_Generatejobmissing3Inputs */
/** @typedef {{}} Sendjob_Recipientdeleted2Inputs */
/** @typedef {{}} Sendjob_Recipientnoemail3Inputs */
/** @typedef {{}} Sendjob_Noattachmentforrecipient4Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Sendjob_Retriesexhausted2Inputs */
/** @typedef {{}} Sendjob_Couldnotresumejob4Inputs */
/** @typedef {{ sent: NonNullable<unknown>, total: NonNullable<unknown> }} Sendjob_Quitinprogress3Inputs */
/** @typedef {{}} Sendjob_Quitandpause3Inputs */
/** @typedef {{}} Sendjob_Keepsending2Inputs */
/** @typedef {{ subject: NonNullable<unknown>, sent: NonNullable<unknown>, total: NonNullable<unknown> }} Sendjob_Launchbanner2Inputs */
/** @typedef {{}} Sendjob_Credentialunreadable2Inputs */
/** @typedef {{}} Generatejob_Templatemissing2Inputs */
/** @typedef {{ path: NonNullable<unknown> }} Generatejob_Templatefilemissing3Inputs */
/** @typedef {{}} Generatejob_Libreofficemissing3Inputs */
/** @typedef {{}} Generatejob_Recipientdeleted2Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Generatejob_Missingslotdata3Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Generatejob_Couldnotfill3Inputs */
/** @typedef {{}} Generatejob_Nopdfproduced3Inputs */
/** @typedef {{}} Generatejob_Selectrecipients2Inputs */
/** @typedef {{}} Generatejob_Norecipientsexist3Inputs */
/** @typedef {{}} Generatejob_Jobcouldnotbecreated5Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Generatejob_Nofreefilename4Inputs */
/** @typedef {{ count: NonNullable<unknown>, names: NonNullable<unknown> }} Generatejob_Unassignedtemplatevalues3Inputs */
/** @typedef {{ value: NonNullable<unknown> }} Generatejob_Unassignedtemplatevalue3Inputs */
/** @typedef {{}} Generatejob_Routingcolumnrequired3Inputs */
/** @typedef {{}} Templatesservice_Docxonly2Inputs */
/** @typedef {{ path: NonNullable<unknown>, detail: NonNullable<unknown> }} Templatesservice_Couldnotread3Inputs */
/** @typedef {{}} Fontsservice_Invalidfontfile3Inputs */
/** @typedef {{ path: NonNullable<unknown> }} Fontsservice_Couldnotread3Inputs */
/** @typedef {{}} Importservice_Nonamecolumn3Inputs */
/** @typedef {{}} Importservice_Noemailcolumn3Inputs */
/** @typedef {{}} Importservice_Notexcel2Inputs */
/** @typedef {{ headers: NonNullable<unknown> }} Importservice_Duplicateheaders2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Importservice_Rowsskippedemptyname4Inputs */
/** @typedef {{}} Validation_Smtpnamerequired2Inputs */
/** @typedef {{}} Validation_Smtphostrequired2Inputs */
/** @typedef {{}} Validation_Smtpportinvalid2Inputs */
/** @typedef {{}} Validation_Smtpusernamerequired2Inputs */
/** @typedef {{}} Validation_Smtppasswordrequired2Inputs */
/** @typedef {{}} Validation_Templatenamerequired2Inputs */
/** @typedef {{}} Validation_Templateneedsslot2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Validation_Templatepatternneedsslot3Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Validation_Templatepatternunknownslot3Inputs */
/** @typedef {{}} Validation_Messagetemplatenamerequired3Inputs */
/** @typedef {{}} Validation_Messagesubjectrequired2Inputs */
/** @typedef {{}} Validation_Messagebodyrequired2Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Validation_Slotlayoutinvalid2Inputs */
/** @typedef {{ slot: NonNullable<unknown>, name: NonNullable<unknown> }} Validation_Patternslotmissingintemplate4Inputs */
/** @typedef {{}} Dialogs_Excelfilter1Inputs */
/** @typedef {{}} Dialogs_Templatefilter1Inputs */
/** @typedef {{}} Dialogs_Pdffilter1Inputs */
/** @typedef {{}} Dialogs_Fontfilter1Inputs */
/** @typedef {{}} Messages_Documentstab1Inputs */
/** @typedef {{}} Messages_Messagestab1Inputs */
/** @typedef {{}} Messages_Addmessagetemplate2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Messages_Countone1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Messages_Countother1Inputs */
/** @typedef {{}} Messages_Notemplatesyet2Inputs */
/** @typedef {{}} Messages_Notemplateshint2Inputs */
/** @typedef {{}} Messages_Addtitle1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Messages_Edittitle1Inputs */
/** @typedef {{}} Messages_EditInputs */
/** @typedef {{ name: NonNullable<unknown> }} Messages_RegisteredInputs */
/** @typedef {{}} Messages_SavedInputs */
/** @typedef {{}} Messages_DeletedInputs */
/** @typedef {{}} Messages_Couldnotload2Inputs */
/** @typedef {{}} Messages_Couldnotsave2Inputs */
/** @typedef {{}} Messages_Couldnotdelete2Inputs */
/** @typedef {{ stamp: NonNullable<unknown> }} Messages_Updatedstamp1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Messages_Bodyhint1Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Messages_Norecipientshint2Inputs */
/** @typedef {{}} Messages_Picklabel1Inputs */
/** @typedef {{}} Messages_Pickplaceholder1Inputs */
/** @typedef {{}} Messages_Saveas1Inputs */
/** @typedef {{}} Messages_Saveastitle2Inputs */
/** @typedef {{}} Messages_Saveasdescription2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Messages_Saveascreated2Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Messages_Deletetitle1Inputs */
/** @typedef {{}} Messages_Deletedescription1Inputs */
/** @typedef {{}} Messages_Subjectdetail1Inputs */
/** @typedef {{}} Messages_Bodydetail1Inputs */
/** @typedef {{}} Messages_Nobodyyet2Inputs */
/** @typedef {{}} Messages_Copyonpickhint3Inputs */
/** @typedef {{}} Messages_Savetemplate1Inputs */
/** @typedef {{}} Messages_NameInputs */
/** @typedef {{}} Generate_TitleInputs */
/** @typedef {{}} Generate_DescriptionInputs */
/** @typedef {{}} Generate_Pastjobs1Inputs */
/** @typedef {{}} Generate_Pastjobsempty2Inputs */
/** @typedef {{}} Generate_Jobtemplate1Inputs */
/** @typedef {{}} Generate_Jobstatus1Inputs */
/** @typedef {{}} Generate_Jobcreated1Inputs */
/** @typedef {{}} Generate_Reopenjob1Inputs */
/** @typedef {{}} Generate_Reopenedtitle1Inputs */
/** @typedef {{}} Generate_Savepdf1Inputs */
/** @typedef {{}} Generate_Couldnotsavepdf3Inputs */
/** @typedef {{}} Generate_Couldnotloadjobs3Inputs */
/** @typedef {{}} Generate_Couldnotreopenjob3Inputs */
/** @typedef {{}} Generate_Jobnolongerexists3Inputs */
/** @typedef {{}} Generate_Startdisabledcoverage2Inputs */
/** @typedef {{}} Generate_Retryjobhint2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Generate_Prefilldeletedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Generate_Prefilldeletedother2Inputs */
/** @typedef {{}} Generate_Routingtitle1Inputs */
/** @typedef {{}} Generate_Routinghint1Inputs */
/** @typedef {{}} Generate_Routingcolumnlabel2Inputs */
/** @typedef {{}} Generate_Routingcolumnnone2Inputs */
/** @typedef {{ column: NonNullable<unknown> }} Generate_Routingcolumnsuggested2Inputs */
/** @typedef {{}} Generate_Defaulttemplatelabel2Inputs */
/** @typedef {{ column: NonNullable<unknown> }} Generate_Defaulttemplatehint2Inputs */
/** @typedef {{}} Generate_Assignmenttitle1Inputs */
/** @typedef {{}} Generate_Assignmenthint1Inputs */
/** @typedef {{ value: NonNullable<unknown> }} Generate_Assignedto1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Generate_Valuecountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Generate_Valuecountother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Generate_Unassignedsummary1Inputs */
/** @typedef {{ value: NonNullable<unknown>, count: NonNullable<unknown>, names: NonNullable<unknown> }} Generate_Unassignedvalueone2Inputs */
/** @typedef {{ value: NonNullable<unknown>, count: NonNullable<unknown>, names: NonNullable<unknown> }} Generate_Unassignedvalueother2Inputs */
/** @typedef {{}} Generate_Allvaluesassigned2Inputs */
/** @typedef {{}} Generate_Patternlabel1Inputs */
/** @typedef {{}} Generate_Patternhint1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Generate_Jobpatternplaceholder2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Generate_Templatecoverageok2Inputs */
/** @typedef {{ missing: NonNullable<unknown>, count: NonNullable<unknown> }} Generate_Templatecoveragemissing2Inputs */
/** @typedef {{}} Generate_Startdisabledrouting2Inputs */
/** @typedef {{}} Generate_Startdisabledpattern2Inputs */
/** @typedef {{ column: NonNullable<unknown> }} Generate_Allblankvalues2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Generate_Unassignedsummaryone2Inputs */
/** @typedef {{}} Update_TitleInputs */
/** @typedef {{}} Update_Checknow1Inputs */
/** @typedef {{}} Update_CheckingInputs */
/** @typedef {{}} Update_Checkfailed1Inputs */
/** @typedef {{}} Update_Uptodate2Inputs */
/** @typedef {{ version: NonNullable<unknown> }} Update_AvailableInputs */
/** @typedef {{ version: NonNullable<unknown>, progress: NonNullable<unknown> }} Update_DownloadingInputs */
/** @typedef {{ version: NonNullable<unknown> }} Update_ReadyInputs */
/** @typedef {{}} Update_DownloadInputs */
/** @typedef {{}} Update_Openreleasepage2Inputs */
/** @typedef {{}} Update_Replacemanually1Inputs */
/** @typedef {{}} Update_Restartandinstall2Inputs */
/** @typedef {{ version: NonNullable<unknown> }} Update_Updatedto1Inputs */
/** @typedef {{}} Update_UnsupportedInputs */
/** @typedef {{ message: NonNullable<unknown> }} Update_Errorcheck1Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Update_Errordownload1Inputs */
/** @typedef {{}} Update_Erroractivejob2Inputs */
export const common_back: (inputs: Common_BackInputs) => LocalizedString;
export const common_next: (inputs: Common_NextInputs) => LocalizedString;
export const common_cancel: (inputs: Common_CancelInputs) => LocalizedString;
export const common_save: (inputs: Common_SaveInputs) => LocalizedString;
export const common_delete: (inputs: Common_DeleteInputs) => LocalizedString;
export const common_retry: (inputs: Common_RetryInputs) => LocalizedString;
export const common_resume: (inputs: Common_ResumeInputs) => LocalizedString;
export const common_pause: (inputs: Common_PauseInputs) => LocalizedString;
export const common_prev: (inputs: Common_PrevInputs) => LocalizedString;
export const common_clear: (inputs: Common_ClearInputs) => LocalizedString;
export const common_dismiss: (inputs: Common_DismissInputs) => LocalizedString;
export const common_browse: (inputs: Common_BrowseInputs) => LocalizedString;
export const common_loading: (inputs: Common_LoadingInputs) => LocalizedString;
export const common_saved: (inputs: Common_SavedInputs) => LocalizedString;
export const common_saving: (inputs: Common_SavingInputs) => LocalizedString;
export const common_deleting: (inputs: Common_DeletingInputs) => LocalizedString;
export const common_testing: (inputs: Common_TestingInputs) => LocalizedString;
export const common_closedetails1: (inputs: Common_Closedetails1Inputs) => LocalizedString;
export const common_couldnotload2: (inputs: Common_Couldnotload2Inputs) => LocalizedString;
export const common_couldnotsave2: (inputs: Common_Couldnotsave2Inputs) => LocalizedString;
export const common_retryfailures1: (inputs: Common_Retryfailures1Inputs) => LocalizedString;
export const common_close: (inputs: Common_CloseInputs) => LocalizedString;
export const nav_import: (inputs: Nav_ImportInputs) => LocalizedString;
export const nav_recipients: (inputs: Nav_RecipientsInputs) => LocalizedString;
export const nav_templates: (inputs: Nav_TemplatesInputs) => LocalizedString;
export const nav_logs: (inputs: Nav_LogsInputs) => LocalizedString;
export const nav_settings: (inputs: Nav_SettingsInputs) => LocalizedString;
export const nav_generate: (inputs: Nav_GenerateInputs) => LocalizedString;
export const nav_send: (inputs: Nav_SendInputs) => LocalizedString;
export const app_backendunreachable1: (inputs: App_Backendunreachable1Inputs) => LocalizedString;
export const welcome_title: (inputs: Welcome_TitleInputs) => LocalizedString;
export const welcome_subtitle: (inputs: Welcome_SubtitleInputs) => LocalizedString;
export const welcome_checkinglibreoffice2: (inputs: Welcome_Checkinglibreoffice2Inputs) => LocalizedString;
export const welcome_libreofficepurpose2: (inputs: Welcome_Libreofficepurpose2Inputs) => LocalizedString;
export const welcome_libreofficefound2: (inputs: Welcome_Libreofficefound2Inputs) => LocalizedString;
export const welcome_libreofficemissing2: (inputs: Welcome_Libreofficemissing2Inputs) => LocalizedString;
export const welcome_libreofficemissingdetail3: (inputs: Welcome_Libreofficemissingdetail3Inputs) => LocalizedString;
export const welcome_installwith1: (inputs: Welcome_Installwith1Inputs) => LocalizedString;
export const welcome_downloadfrom1: (inputs: Welcome_Downloadfrom1Inputs) => LocalizedString;
export const welcome_checkagain1: (inputs: Welcome_Checkagain1Inputs) => LocalizedString;
export const welcome_templatesfolder1: (inputs: Welcome_Templatesfolder1Inputs) => LocalizedString;
export const welcome_outputfolder1: (inputs: Welcome_Outputfolder1Inputs) => LocalizedString;
export const welcome_settingup1: (inputs: Welcome_Settingup1Inputs) => LocalizedString;
export const welcome_getstarted1: (inputs: Welcome_Getstarted1Inputs) => LocalizedString;
export const status_pending: (inputs: Status_PendingInputs) => LocalizedString;
export const status_sending: (inputs: Status_SendingInputs) => LocalizedString;
export const status_paused: (inputs: Status_PausedInputs) => LocalizedString;
export const status_completed: (inputs: Status_CompletedInputs) => LocalizedString;
export const status_cancelled: (inputs: Status_CancelledInputs) => LocalizedString;
export const status_failed: (inputs: Status_FailedInputs) => LocalizedString;
export const status_skipped: (inputs: Status_SkippedInputs) => LocalizedString;
export const status_sent: (inputs: Status_SentInputs) => LocalizedString;
export const status_generating: (inputs: Status_GeneratingInputs) => LocalizedString;
export const status_generated: (inputs: Status_GeneratedInputs) => LocalizedString;
export const settingspage_title1: (inputs: Settingspage_Title1Inputs) => LocalizedString;
export const settingspage_description1: (inputs: Settingspage_Description1Inputs) => LocalizedString;
export const settingspage_ratelimiting2: (inputs: Settingspage_Ratelimiting2Inputs) => LocalizedString;
export const settingspage_ratelimitingdescription3: (inputs: Settingspage_Ratelimitingdescription3Inputs) => LocalizedString;
export const settingspage_msperemail3: (inputs: Settingspage_Msperemail3Inputs) => LocalizedString;
export const settingspage_delaybetweenemails3: (inputs: Settingspage_Delaybetweenemails3Inputs) => LocalizedString;
export const settingspage_defaultfolders2: (inputs: Settingspage_Defaultfolders2Inputs) => LocalizedString;
export const settingspage_defaultfoldersdescription3: (inputs: Settingspage_Defaultfoldersdescription3Inputs) => LocalizedString;
export const settingspage_templatesfolder2: (inputs: Settingspage_Templatesfolder2Inputs) => LocalizedString;
export const settingspage_outputfolder2: (inputs: Settingspage_Outputfolder2Inputs) => LocalizedString;
export const settingspage_about1: (inputs: Settingspage_About1Inputs) => LocalizedString;
export const settingspage_app1: (inputs: Settingspage_App1Inputs) => LocalizedString;
export const settingspage_version1: (inputs: Settingspage_Version1Inputs) => LocalizedString;
export const settingspage_data1: (inputs: Settingspage_Data1Inputs) => LocalizedString;
export const settingspage_storedlocally2: (inputs: Settingspage_Storedlocally2Inputs) => LocalizedString;
export const settingspage_language1: (inputs: Settingspage_Language1Inputs) => LocalizedString;
export const settingspage_languagedescription2: (inputs: Settingspage_Languagedescription2Inputs) => LocalizedString;
export const settingspage_ratepersecondone4: (inputs: Settingspage_Ratepersecondone4Inputs) => LocalizedString;
export const settingspage_ratepersecondother4: (inputs: Settingspage_Ratepersecondother4Inputs) => LocalizedString;
export const settingspage_couldnotload3: (inputs: Settingspage_Couldnotload3Inputs) => LocalizedString;
export const smtp_title: (inputs: Smtp_TitleInputs) => LocalizedString;
export const smtp_description: (inputs: Smtp_DescriptionInputs) => LocalizedString;
export const smtp_addprofile1: (inputs: Smtp_Addprofile1Inputs) => LocalizedString;
export const smtp_profilesaved1: (inputs: Smtp_Profilesaved1Inputs) => LocalizedString;
export const smtp_profiledeleted1: (inputs: Smtp_Profiledeleted1Inputs) => LocalizedString;
export const smtp_couldnotsaveprofile3: (inputs: Smtp_Couldnotsaveprofile3Inputs) => LocalizedString;
export const smtp_couldnotdeleteprofile3: (inputs: Smtp_Couldnotdeleteprofile3Inputs) => LocalizedString;
export const smtp_couldnotloadprofiles3: (inputs: Smtp_Couldnotloadprofiles3Inputs) => LocalizedString;
export const smtp_loadingprofiles1: (inputs: Smtp_Loadingprofiles1Inputs) => LocalizedString;
export const smtp_noprofilesyet2: (inputs: Smtp_Noprofilesyet2Inputs) => LocalizedString;
export const smtp_noprofilesdescription2: (inputs: Smtp_Noprofilesdescription2Inputs) => LocalizedString;
export const smtp_testconnection1: (inputs: Smtp_Testconnection1Inputs) => LocalizedString;
export const smtp_connectionok1: (inputs: Smtp_Connectionok1Inputs) => LocalizedString;
export const smtp_connected: (inputs: Smtp_ConnectedInputs) => LocalizedString;
export const smtp_connectionfailed1: (inputs: Smtp_Connectionfailed1Inputs) => LocalizedString;
export const smtp_passwordnotset2: (inputs: Smtp_Passwordnotset2Inputs) => LocalizedString;
export const smtp_addprofiletitle2: (inputs: Smtp_Addprofiletitle2Inputs) => LocalizedString;
export const smtp_editprofiletitle2: (inputs: Smtp_Editprofiletitle2Inputs) => LocalizedString;
export const smtp_createhint1: (inputs: Smtp_Createhint1Inputs) => LocalizedString;
export const smtp_edithint1: (inputs: Smtp_Edithint1Inputs) => LocalizedString;
export const smtp_profilename1: (inputs: Smtp_Profilename1Inputs) => LocalizedString;
export const smtp_smtphost1: (inputs: Smtp_Smtphost1Inputs) => LocalizedString;
export const smtp_port: (inputs: Smtp_PortInputs) => LocalizedString;
export const smtp_implicittls1: (inputs: Smtp_Implicittls1Inputs) => LocalizedString;
export const smtp_starttls: (inputs: Smtp_StarttlsInputs) => LocalizedString;
export const smtp_username: (inputs: Smtp_UsernameInputs) => LocalizedString;
export const smtp_apppassword1: (inputs: Smtp_Apppassword1Inputs) => LocalizedString;
export const smtp_leaveblanktokeep3: (inputs: Smtp_Leaveblanktokeep3Inputs) => LocalizedString;
export const smtp_gmailapppasswordhint3: (inputs: Smtp_Gmailapppasswordhint3Inputs) => LocalizedString;
export const smtp_defaultsendername2: (inputs: Smtp_Defaultsendername2Inputs) => LocalizedString;
export const smtp_defaultsenderaddress2: (inputs: Smtp_Defaultsenderaddress2Inputs) => LocalizedString;
export const smtp_replyto1: (inputs: Smtp_Replyto1Inputs) => LocalizedString;
export const smtp_identityhint1: (inputs: Smtp_Identityhint1Inputs) => LocalizedString;
export const smtp_saveprofile1: (inputs: Smtp_Saveprofile1Inputs) => LocalizedString;
export const smtp_savechanges1: (inputs: Smtp_Savechanges1Inputs) => LocalizedString;
export const smtp_deleteprofiletitle2: (inputs: Smtp_Deleteprofiletitle2Inputs) => LocalizedString;
export const smtp_deleteprofiledescription2: (inputs: Smtp_Deleteprofiledescription2Inputs) => LocalizedString;
export const smtp_passwordlabel1: (inputs: Smtp_Passwordlabel1Inputs) => LocalizedString;
export const compose_steprecipients1: (inputs: Compose_Steprecipients1Inputs) => LocalizedString;
export const compose_steptemplate1: (inputs: Compose_Steptemplate1Inputs) => LocalizedString;
export const compose_stepmessage1: (inputs: Compose_Stepmessage1Inputs) => LocalizedString;
export const compose_stepsmtp1: (inputs: Compose_Stepsmtp1Inputs) => LocalizedString;
export const compose_stepgenerate1: (inputs: Compose_Stepgenerate1Inputs) => LocalizedString;
export const compose_stepsend1: (inputs: Compose_Stepsend1Inputs) => LocalizedString;
export const compose_writesubjecttocontinue3: (inputs: Compose_Writesubjecttocontinue3Inputs) => LocalizedString;
export const compose_writebodytocontinue3: (inputs: Compose_Writebodytocontinue3Inputs) => LocalizedString;
export const compose_completesmtpdetails2: (inputs: Compose_Completesmtpdetails2Inputs) => LocalizedString;
export const compose_searchrecipients1: (inputs: Compose_Searchrecipients1Inputs) => LocalizedString;
export const compose_searchplaceholder1: (inputs: Compose_Searchplaceholder1Inputs) => LocalizedString;
export const compose_filterbybatch2: (inputs: Compose_Filterbybatch2Inputs) => LocalizedString;
export const compose_allbatches1: (inputs: Compose_Allbatches1Inputs) => LocalizedString;
export const compose_batchoption1: (inputs: Compose_Batchoption1Inputs) => LocalizedString;
export const compose_selectallmatchingtitle3: (inputs: Compose_Selectallmatchingtitle3Inputs) => LocalizedString;
export const compose_selectallcount2: (inputs: Compose_Selectallcount2Inputs) => LocalizedString;
export const compose_couldnotloadrecipients3: (inputs: Compose_Couldnotloadrecipients3Inputs) => LocalizedString;
export const compose_norecipientsyet2: (inputs: Compose_Norecipientsyet2Inputs) => LocalizedString;
export const compose_norecipientsmatchfilter3: (inputs: Compose_Norecipientsmatchfilter3Inputs) => LocalizedString;
export const compose_norecipientshint2: (inputs: Compose_Norecipientshint2Inputs) => LocalizedString;
export const compose_gotoimport2: (inputs: Compose_Gotoimport2Inputs) => LocalizedString;
export const compose_trydifferentfilter2: (inputs: Compose_Trydifferentfilter2Inputs) => LocalizedString;
export const compose_selectallonpage3: (inputs: Compose_Selectallonpage3Inputs) => LocalizedString;
export const compose_name: (inputs: Compose_NameInputs) => LocalizedString;
export const compose_email: (inputs: Compose_EmailInputs) => LocalizedString;
export const compose_phone: (inputs: Compose_PhoneInputs) => LocalizedString;
export const compose_selectrecipient1: (inputs: Compose_Selectrecipient1Inputs) => LocalizedString;
export const compose_selectioncount1: (inputs: Compose_Selectioncount1Inputs) => LocalizedString;
export const compose_pageof1: (inputs: Compose_Pageof1Inputs) => LocalizedString;
export const compose_templatelabel1: (inputs: Compose_Templatelabel1Inputs) => LocalizedString;
export const compose_choosetemplate1: (inputs: Compose_Choosetemplate1Inputs) => LocalizedString;
export const compose_notemplatesregistered2: (inputs: Compose_Notemplatesregistered2Inputs) => LocalizedString;
export const compose_registertemplatelink2: (inputs: Compose_Registertemplatelink2Inputs) => LocalizedString;
export const compose_notemplatesregisteredhint3: (inputs: Compose_Notemplatesregisteredhint3Inputs) => LocalizedString;
export const compose_requiredslots1: (inputs: Compose_Requiredslots1Inputs) => LocalizedString;
export const compose_outputpattern1: (inputs: Compose_Outputpattern1Inputs) => LocalizedString;
export const compose_allcovered1: (inputs: Compose_Allcovered1Inputs) => LocalizedString;
export const compose_missingdatasummary2: (inputs: Compose_Missingdatasummary2Inputs) => LocalizedString;
export const compose_missingdatahint2: (inputs: Compose_Missingdatahint2Inputs) => LocalizedString;
export const compose_subject: (inputs: Compose_SubjectInputs) => LocalizedString;
export const compose_subjectplaceholder1: (inputs: Compose_Subjectplaceholder1Inputs) => LocalizedString;
export const compose_bodylabel1: (inputs: Compose_Bodylabel1Inputs) => LocalizedString;
export const compose_bodyplaceholder1: (inputs: Compose_Bodyplaceholder1Inputs) => LocalizedString;
export const compose_unknownslothint2: (inputs: Compose_Unknownslothint2Inputs) => LocalizedString;
export const compose_missingslottitle2: (inputs: Compose_Missingslottitle2Inputs) => LocalizedString;
export const compose_missingslothint2: (inputs: Compose_Missingslothint2Inputs) => LocalizedString;
export const compose_livepreview1: (inputs: Compose_Livepreview1Inputs) => LocalizedString;
export const compose_previewfor1: (inputs: Compose_Previewfor1Inputs) => LocalizedString;
export const compose_emailconnection1: (inputs: Compose_Emailconnection1Inputs) => LocalizedString;
export const compose_savedprofile1: (inputs: Compose_Savedprofile1Inputs) => LocalizedString;
export const compose_enterdetails1: (inputs: Compose_Enterdetails1Inputs) => LocalizedString;
export const compose_chooseprofile1: (inputs: Compose_Chooseprofile1Inputs) => LocalizedString;
export const compose_nosavedprofileshint3: (inputs: Compose_Nosavedprofileshint3Inputs) => LocalizedString;
export const compose_settingslink1: (inputs: Compose_Settingslink1Inputs) => LocalizedString;
export const compose_host: (inputs: Compose_HostInputs) => LocalizedString;
export const compose_portlabel1: (inputs: Compose_Portlabel1Inputs) => LocalizedString;
export const compose_usernamelabel1: (inputs: Compose_Usernamelabel1Inputs) => LocalizedString;
export const compose_apppasswordlabel2: (inputs: Compose_Apppasswordlabel2Inputs) => LocalizedString;
export const compose_saveasprofile2: (inputs: Compose_Saveasprofile2Inputs) => LocalizedString;
export const compose_profilenameplaceholder2: (inputs: Compose_Profilenameplaceholder2Inputs) => LocalizedString;
export const compose_testconnectionbutton2: (inputs: Compose_Testconnectionbutton2Inputs) => LocalizedString;
export const compose_senderidentity1: (inputs: Compose_Senderidentity1Inputs) => LocalizedString;
export const compose_sendername1: (inputs: Compose_Sendername1Inputs) => LocalizedString;
export const compose_senderaddress1: (inputs: Compose_Senderaddress1Inputs) => LocalizedString;
export const compose_replyto1: (inputs: Compose_Replyto1Inputs) => LocalizedString;
export const compose_senderdomainmismatch2: (inputs: Compose_Senderdomainmismatch2Inputs) => LocalizedString;
export const compose_senderdiffersfromprofile3: (inputs: Compose_Senderdiffersfromprofile3Inputs) => LocalizedString;
export const compose_sendingrate1: (inputs: Compose_Sendingrate1Inputs) => LocalizedString;
export const compose_sendingratems2: (inputs: Compose_Sendingratems2Inputs) => LocalizedString;
export const compose_sendingratehint2: (inputs: Compose_Sendingratehint2Inputs) => LocalizedString;
export const compose_generationfailed1: (inputs: Compose_Generationfailed1Inputs) => LocalizedString;
export const compose_connectionfailed1: (inputs: Compose_Connectionfailed1Inputs) => LocalizedString;
export const compose_choosetemplatefirst2: (inputs: Compose_Choosetemplatefirst2Inputs) => LocalizedString;
export const compose_campaignsummary1: (inputs: Compose_Campaignsummary1Inputs) => LocalizedString;
export const compose_recipients: (inputs: Compose_RecipientsInputs) => LocalizedString;
export const compose_template: (inputs: Compose_TemplateInputs) => LocalizedString;
export const compose_outputfolder1: (inputs: Compose_Outputfolder1Inputs) => LocalizedString;
export const compose_campaignsummaryhint2: (inputs: Compose_Campaignsummaryhint2Inputs) => LocalizedString;
export const compose_generatepdfs1: (inputs: Compose_Generatepdfs1Inputs) => LocalizedString;
export const compose_generating: (inputs: Compose_GeneratingInputs) => LocalizedString;
export const compose_oftotal1: (inputs: Compose_Oftotal1Inputs) => LocalizedString;
export const compose_generatedcounts1: (inputs: Compose_Generatedcounts1Inputs) => LocalizedString;
export const compose_tryagain1: (inputs: Compose_Tryagain1Inputs) => LocalizedString;
export const compose_allgenerated1: (inputs: Compose_Allgenerated1Inputs) => LocalizedString;
export const compose_generatedwithfailures2: (inputs: Compose_Generatedwithfailures2Inputs) => LocalizedString;
export const compose_failedrecipientstitle2: (inputs: Compose_Failedrecipientstitle2Inputs) => LocalizedString;
export const compose_spotcheck1: (inputs: Compose_Spotcheck1Inputs) => LocalizedString;
export const compose_spotindex1: (inputs: Compose_Spotindex1Inputs) => LocalizedString;
export const compose_loadingpreview1: (inputs: Compose_Loadingpreview1Inputs) => LocalizedString;
export const compose_sendsummary1: (inputs: Compose_Sendsummary1Inputs) => LocalizedString;
export const compose_sender: (inputs: Compose_SenderInputs) => LocalizedString;
export const compose_connection: (inputs: Compose_ConnectionInputs) => LocalizedString;
export const compose_pacing: (inputs: Compose_PacingInputs) => LocalizedString;
export const compose_attachments: (inputs: Compose_AttachmentsInputs) => LocalizedString;
export const compose_preparingsend1: (inputs: Compose_Preparingsend1Inputs) => LocalizedString;
export const compose_sending: (inputs: Compose_SendingInputs) => LocalizedString;
export const compose_sendcounts1: (inputs: Compose_Sendcounts1Inputs) => LocalizedString;
export const compose_windingdowntitle2: (inputs: Compose_Windingdowntitle2Inputs) => LocalizedString;
export const compose_cancelsendconfirm2: (inputs: Compose_Cancelsendconfirm2Inputs) => LocalizedString;
export const compose_perrecipientlog2: (inputs: Compose_Perrecipientlog2Inputs) => LocalizedString;
export const compose_waitingfirstemail2: (inputs: Compose_Waitingfirstemail2Inputs) => LocalizedString;
export const compose_allemailssent2: (inputs: Compose_Allemailssent2Inputs) => LocalizedString;
export const compose_sentwithfailures2: (inputs: Compose_Sentwithfailures2Inputs) => LocalizedString;
export const compose_sendcancelled1: (inputs: Compose_Sendcancelled1Inputs) => LocalizedString;
export const compose_cancelleddetail1: (inputs: Compose_Cancelleddetail1Inputs) => LocalizedString;
export const compose_recipient: (inputs: Compose_RecipientInputs) => LocalizedString;
export const compose_rowskipped1: (inputs: Compose_Rowskipped1Inputs) => LocalizedString;
export const compose_sendingfailed1: (inputs: Compose_Sendingfailed1Inputs) => LocalizedString;
export const compose_couldnotstartsend3: (inputs: Compose_Couldnotstartsend3Inputs) => LocalizedString;
export const compose_couldnotpausesend3: (inputs: Compose_Couldnotpausesend3Inputs) => LocalizedString;
export const compose_couldnotcancelsend3: (inputs: Compose_Couldnotcancelsend3Inputs) => LocalizedString;
export const compose_couldnotretryfailures3: (inputs: Compose_Couldnotretryfailures3Inputs) => LocalizedString;
export const compose_sendjobnolongerexists4: (inputs: Compose_Sendjobnolongerexists4Inputs) => LocalizedString;
export const compose_couldnotresumesend3: (inputs: Compose_Couldnotresumesend3Inputs) => LocalizedString;
export const compose_slotmissingcountone3: (inputs: Compose_Slotmissingcountone3Inputs) => LocalizedString;
export const compose_slotmissingcountother3: (inputs: Compose_Slotmissingcountother3Inputs) => LocalizedString;
export const compose_unknownslottitleone3: (inputs: Compose_Unknownslottitleone3Inputs) => LocalizedString;
export const compose_unknownslottitleother3: (inputs: Compose_Unknownslottitleother3Inputs) => LocalizedString;
export const compose_livepreviewhintone3: (inputs: Compose_Livepreviewhintone3Inputs) => LocalizedString;
export const compose_livepreviewhintother3: (inputs: Compose_Livepreviewhintother3Inputs) => LocalizedString;
export const compose_sendcountone2: (inputs: Compose_Sendcountone2Inputs) => LocalizedString;
export const compose_sendcountother2: (inputs: Compose_Sendcountother2Inputs) => LocalizedString;
export const compose_apppasswordplaceholder2: (inputs: Compose_Apppasswordplaceholder2Inputs) => LocalizedString;
export const compose_replytoplaceholder2: (inputs: Compose_Replytoplaceholder2Inputs) => LocalizedString;
export const templates_title: (inputs: Templates_TitleInputs) => LocalizedString;
export const templates_addtemplate1: (inputs: Templates_Addtemplate1Inputs) => LocalizedString;
export const templates_templateregistered1: (inputs: Templates_Templateregistered1Inputs) => LocalizedString;
export const templates_templatesaved1: (inputs: Templates_Templatesaved1Inputs) => LocalizedString;
export const templates_templatedeleted1: (inputs: Templates_Templatedeleted1Inputs) => LocalizedString;
export const templates_couldnotregister2: (inputs: Templates_Couldnotregister2Inputs) => LocalizedString;
export const templates_couldnotsave2: (inputs: Templates_Couldnotsave2Inputs) => LocalizedString;
export const templates_couldnotdelete2: (inputs: Templates_Couldnotdelete2Inputs) => LocalizedString;
export const templates_couldnotload2: (inputs: Templates_Couldnotload2Inputs) => LocalizedString;
export const templates_loadingtemplates1: (inputs: Templates_Loadingtemplates1Inputs) => LocalizedString;
export const templates_notemplatesyet2: (inputs: Templates_Notemplatesyet2Inputs) => LocalizedString;
export const templates_notemplateshint2: (inputs: Templates_Notemplateshint2Inputs) => LocalizedString;
export const templates_unsupportedfile1: (inputs: Templates_Unsupportedfile1Inputs) => LocalizedString;
export const templates_registered: (inputs: Templates_RegisteredInputs) => LocalizedString;
export const templates_slots: (inputs: Templates_SlotsInputs) => LocalizedString;
export const templates_noslotsdeclared2: (inputs: Templates_Noslotsdeclared2Inputs) => LocalizedString;
export const templates_outputpatternhint2: (inputs: Templates_Outputpatternhint2Inputs) => LocalizedString;
export const templates_editexternallyhint2: (inputs: Templates_Editexternallyhint2Inputs) => LocalizedString;
export const templates_edit: (inputs: Templates_EditInputs) => LocalizedString;
export const templates_addtitle1: (inputs: Templates_Addtitle1Inputs) => LocalizedString;
export const templates_edittitle1: (inputs: Templates_Edittitle1Inputs) => LocalizedString;
export const templates_templatename1: (inputs: Templates_Templatename1Inputs) => LocalizedString;
export const templates_scanning: (inputs: Templates_ScanningInputs) => LocalizedString;
export const templates_rescanfromfile2: (inputs: Templates_Rescanfromfile2Inputs) => LocalizedString;
export const templates_rescanconfirm1: (inputs: Templates_Rescanconfirm1Inputs) => LocalizedString;
export const templates_replaceslots1: (inputs: Templates_Replaceslots1Inputs) => LocalizedString;
export const templates_keepmyslots2: (inputs: Templates_Keepmyslots2Inputs) => LocalizedString;
export const templates_docxslotshint2: (inputs: Templates_Docxslotshint2Inputs) => LocalizedString;
export const templates_imageslotshint2: (inputs: Templates_Imageslotshint2Inputs) => LocalizedString;
export const templates_couldnotscan2: (inputs: Templates_Couldnotscan2Inputs) => LocalizedString;
export const templates_slotscanbetyped3: (inputs: Templates_Slotscanbetyped3Inputs) => LocalizedString;
export const templates_slotaria1: (inputs: Templates_Slotaria1Inputs) => LocalizedString;
export const templates_removeslotaria2: (inputs: Templates_Removeslotaria2Inputs) => LocalizedString;
export const templates_addslot1: (inputs: Templates_Addslot1Inputs) => LocalizedString;
export const templates_outputpatternfield2: (inputs: Templates_Outputpatternfield2Inputs) => LocalizedString;
export const templates_outputpatternplaceholder2: (inputs: Templates_Outputpatternplaceholder2Inputs) => LocalizedString;
export const templates_registertemplate1: (inputs: Templates_Registertemplate1Inputs) => LocalizedString;
export const templates_savechanges1: (inputs: Templates_Savechanges1Inputs) => LocalizedString;
export const templates_deletetitle1: (inputs: Templates_Deletetitle1Inputs) => LocalizedString;
export const templates_deletedescription1: (inputs: Templates_Deletedescription1Inputs) => LocalizedString;
export const templates_thistemplate1: (inputs: Templates_Thistemplate1Inputs) => LocalizedString;
export const templates_countregisteredone2: (inputs: Templates_Countregisteredone2Inputs) => LocalizedString;
export const templates_countregisteredother2: (inputs: Templates_Countregisteredother2Inputs) => LocalizedString;
export const templates_slotcountone2: (inputs: Templates_Slotcountone2Inputs) => LocalizedString;
export const templates_slotcountother2: (inputs: Templates_Slotcountother2Inputs) => LocalizedString;
export const templates_slotlayouttitle2: (inputs: Templates_Slotlayouttitle2Inputs) => LocalizedString;
export const templates_slotlayouthint2: (inputs: Templates_Slotlayouthint2Inputs) => LocalizedString;
export const templates_slotlayoutdone2: (inputs: Templates_Slotlayoutdone2Inputs) => LocalizedString;
export const templates_slotlayoutimagefailed3: (inputs: Templates_Slotlayoutimagefailed3Inputs) => LocalizedString;
export const templates_positiontextonimage3: (inputs: Templates_Positiontextonimage3Inputs) => LocalizedString;
export const templates_slotx1: (inputs: Templates_Slotx1Inputs) => LocalizedString;
export const templates_sloty1: (inputs: Templates_Sloty1Inputs) => LocalizedString;
export const templates_slotfontsize2: (inputs: Templates_Slotfontsize2Inputs) => LocalizedString;
export const templates_slotmaxwidth2: (inputs: Templates_Slotmaxwidth2Inputs) => LocalizedString;
export const templates_slotmaxwidthauto3: (inputs: Templates_Slotmaxwidthauto3Inputs) => LocalizedString;
export const templates_slotcolor1: (inputs: Templates_Slotcolor1Inputs) => LocalizedString;
export const templates_slotalign1: (inputs: Templates_Slotalign1Inputs) => LocalizedString;
export const templates_slotalignleft2: (inputs: Templates_Slotalignleft2Inputs) => LocalizedString;
export const templates_slotaligncenter2: (inputs: Templates_Slotaligncenter2Inputs) => LocalizedString;
export const templates_slotalignright2: (inputs: Templates_Slotalignright2Inputs) => LocalizedString;
export const templates_slotfontface2: (inputs: Templates_Slotfontface2Inputs) => LocalizedString;
export const templates_slotfontfacedefault3: (inputs: Templates_Slotfontfacedefault3Inputs) => LocalizedString;
export const templates_addfont1: (inputs: Templates_Addfont1Inputs) => LocalizedString;
export const templates_fontadded1: (inputs: Templates_Fontadded1Inputs) => LocalizedString;
export const templates_fontaddfailed2: (inputs: Templates_Fontaddfailed2Inputs) => LocalizedString;
export const templates_fontlistfailed2: (inputs: Templates_Fontlistfailed2Inputs) => LocalizedString;
export const importpage_title1: (inputs: Importpage_Title1Inputs) => LocalizedString;
export const importpage_description1: (inputs: Importpage_Description1Inputs) => LocalizedString;
export const importpage_allowduplicates2: (inputs: Importpage_Allowduplicates2Inputs) => LocalizedString;
export const importpage_allowduplicateshint3: (inputs: Importpage_Allowduplicateshint3Inputs) => LocalizedString;
export const importpage_importanotherfile3: (inputs: Importpage_Importanotherfile3Inputs) => LocalizedString;
export const importpage_dragdrophint3: (inputs: Importpage_Dragdrophint3Inputs) => LocalizedString;
export const importpage_fileformathint3: (inputs: Importpage_Fileformathint3Inputs) => LocalizedString;
export const importpage_parsing1: (inputs: Importpage_Parsing1Inputs) => LocalizedString;
export const importpage_importcomplete2: (inputs: Importpage_Importcomplete2Inputs) => LocalizedString;
export const importpage_gotorecipients3: (inputs: Importpage_Gotorecipients3Inputs) => LocalizedString;
export const importpage_couldnotread3: (inputs: Importpage_Couldnotread3Inputs) => LocalizedString;
export const importpage_notexcelfile3: (inputs: Importpage_Notexcelfile3Inputs) => LocalizedString;
export const importpage_couldnotcommit3: (inputs: Importpage_Couldnotcommit3Inputs) => LocalizedString;
export const importpage_preview1: (inputs: Importpage_Preview1Inputs) => LocalizedString;
export const importpage_previewrows2: (inputs: Importpage_Previewrows2Inputs) => LocalizedString;
export const importpage_columnmapping2: (inputs: Importpage_Columnmapping2Inputs) => LocalizedString;
export const importpage_columnmappinghint3: (inputs: Importpage_Columnmappinghint3Inputs) => LocalizedString;
export const importpage_columnrolearia3: (inputs: Importpage_Columnrolearia3Inputs) => LocalizedString;
export const importpage_resetmapping2: (inputs: Importpage_Resetmapping2Inputs) => LocalizedString;
export const importpage_selectnamecolumn3: (inputs: Importpage_Selectnamecolumn3Inputs) => LocalizedString;
export const importpage_importing1: (inputs: Importpage_Importing1Inputs) => LocalizedString;
export const importpage_importrecipients2: (inputs: Importpage_Importrecipients2Inputs) => LocalizedString;
export const importpage_nodatarows3: (inputs: Importpage_Nodatarows3Inputs) => LocalizedString;
export const importpage_rolename2: (inputs: Importpage_Rolename2Inputs) => LocalizedString;
export const importpage_roleemail2: (inputs: Importpage_Roleemail2Inputs) => LocalizedString;
export const importpage_rolephone2: (inputs: Importpage_Rolephone2Inputs) => LocalizedString;
export const importpage_rolemetadata2: (inputs: Importpage_Rolemetadata2Inputs) => LocalizedString;
export const importpage_roleskip2: (inputs: Importpage_Roleskip2Inputs) => LocalizedString;
export const importpage_importcompletedetailone4: (inputs: Importpage_Importcompletedetailone4Inputs) => LocalizedString;
export const importpage_importcompletedetailother4: (inputs: Importpage_Importcompletedetailother4Inputs) => LocalizedString;
export const importpage_rowsskippednonameone5: (inputs: Importpage_Rowsskippednonameone5Inputs) => LocalizedString;
export const importpage_rowsskippednonameother5: (inputs: Importpage_Rowsskippednonameother5Inputs) => LocalizedString;
export const importpage_importedtoastone3: (inputs: Importpage_Importedtoastone3Inputs) => LocalizedString;
export const importpage_importedtoastother3: (inputs: Importpage_Importedtoastother3Inputs) => LocalizedString;
export const importpage_duplicatesskippedparsingone4: (inputs: Importpage_Duplicatesskippedparsingone4Inputs) => LocalizedString;
export const importpage_duplicatesskippedparsingother4: (inputs: Importpage_Duplicatesskippedparsingother4Inputs) => LocalizedString;
export const importpage_gotogenerate3: (inputs: Importpage_Gotogenerate3Inputs) => LocalizedString;
export const importpage_roletemplate2: (inputs: Importpage_Roletemplate2Inputs) => LocalizedString;
export const recipients_title: (inputs: Recipients_TitleInputs) => LocalizedString;
export const recipients_couldnotdelete2: (inputs: Recipients_Couldnotdelete2Inputs) => LocalizedString;
export const recipients_deleteselected1: (inputs: Recipients_Deleteselected1Inputs) => LocalizedString;
export const recipients_deleteselectedcount2: (inputs: Recipients_Deleteselectedcount2Inputs) => LocalizedString;
export const recipients_searchplaceholder1: (inputs: Recipients_Searchplaceholder1Inputs) => LocalizedString;
export const recipients_searcharia1: (inputs: Recipients_Searcharia1Inputs) => LocalizedString;
export const recipients_filterbybatch2: (inputs: Recipients_Filterbybatch2Inputs) => LocalizedString;
export const recipients_allbatches1: (inputs: Recipients_Allbatches1Inputs) => LocalizedString;
export const recipients_couldnotload2: (inputs: Recipients_Couldnotload2Inputs) => LocalizedString;
export const recipients_loadingrecipients1: (inputs: Recipients_Loadingrecipients1Inputs) => LocalizedString;
export const recipients_norecipientsyet2: (inputs: Recipients_Norecipientsyet2Inputs) => LocalizedString;
export const recipients_norecipientshint2: (inputs: Recipients_Norecipientshint2Inputs) => LocalizedString;
export const recipients_gotoimport2: (inputs: Recipients_Gotoimport2Inputs) => LocalizedString;
export const recipients_nomatchfilters2: (inputs: Recipients_Nomatchfilters2Inputs) => LocalizedString;
export const recipients_nomatchhint2: (inputs: Recipients_Nomatchhint2Inputs) => LocalizedString;
export const recipients_clearfilters1: (inputs: Recipients_Clearfilters1Inputs) => LocalizedString;
export const recipients_showingrange1: (inputs: Recipients_Showingrange1Inputs) => LocalizedString;
export const recipients_previous: (inputs: Recipients_PreviousInputs) => LocalizedString;
export const recipients_next: (inputs: Recipients_NextInputs) => LocalizedString;
export const recipients_pageof1: (inputs: Recipients_Pageof1Inputs) => LocalizedString;
export const recipients_selectallonpage3: (inputs: Recipients_Selectallonpage3Inputs) => LocalizedString;
export const recipients_name: (inputs: Recipients_NameInputs) => LocalizedString;
export const recipients_email: (inputs: Recipients_EmailInputs) => LocalizedString;
export const recipients_phone: (inputs: Recipients_PhoneInputs) => LocalizedString;
export const recipients_importbatch1: (inputs: Recipients_Importbatch1Inputs) => LocalizedString;
export const recipients_imported: (inputs: Recipients_ImportedInputs) => LocalizedString;
export const recipients_selectrecipient1: (inputs: Recipients_Selectrecipient1Inputs) => LocalizedString;
export const recipients_noemailaddress2: (inputs: Recipients_Noemailaddress2Inputs) => LocalizedString;
export const recipients_customfields1: (inputs: Recipients_Customfields1Inputs) => LocalizedString;
export const recipients_nocustomfields2: (inputs: Recipients_Nocustomfields2Inputs) => LocalizedString;
export const recipients_deletedescription1: (inputs: Recipients_Deletedescription1Inputs) => LocalizedString;
export const recipients_countindirectoryone3: (inputs: Recipients_Countindirectoryone3Inputs) => LocalizedString;
export const recipients_countindirectoryother3: (inputs: Recipients_Countindirectoryother3Inputs) => LocalizedString;
export const recipients_deletedcountone2: (inputs: Recipients_Deletedcountone2Inputs) => LocalizedString;
export const recipients_deletedcountother2: (inputs: Recipients_Deletedcountother2Inputs) => LocalizedString;
export const recipients_deletetitleone2: (inputs: Recipients_Deletetitleone2Inputs) => LocalizedString;
export const recipients_deletetitleother2: (inputs: Recipients_Deletetitleother2Inputs) => LocalizedString;
export const recipients_edit: (inputs: Recipients_EditInputs) => LocalizedString;
export const recipients_edittitle1: (inputs: Recipients_Edittitle1Inputs) => LocalizedString;
export const recipients_updated: (inputs: Recipients_UpdatedInputs) => LocalizedString;
export const recipients_couldnotupdate2: (inputs: Recipients_Couldnotupdate2Inputs) => LocalizedString;
export const recipients_namerequired1: (inputs: Recipients_Namerequired1Inputs) => LocalizedString;
export const recipients_emailmustcontainat3: (inputs: Recipients_Emailmustcontainat3Inputs) => LocalizedString;
export const logs_title: (inputs: Logs_TitleInputs) => LocalizedString;
export const logs_description: (inputs: Logs_DescriptionInputs) => LocalizedString;
export const logs_filterbystatus2: (inputs: Logs_Filterbystatus2Inputs) => LocalizedString;
export const logs_allstatuses1: (inputs: Logs_Allstatuses1Inputs) => LocalizedString;
export const logs_from: (inputs: Logs_FromInputs) => LocalizedString;
export const logs_to: (inputs: Logs_ToInputs) => LocalizedString;
export const logs_jobscreatedfrom2: (inputs: Logs_Jobscreatedfrom2Inputs) => LocalizedString;
export const logs_jobscreatedupto3: (inputs: Logs_Jobscreatedupto3Inputs) => LocalizedString;
export const logs_couldnotload2: (inputs: Logs_Couldnotload2Inputs) => LocalizedString;
export const logs_loadinglogs1: (inputs: Logs_Loadinglogs1Inputs) => LocalizedString;
export const logs_nojobsmatchfilters3: (inputs: Logs_Nojobsmatchfilters3Inputs) => LocalizedString;
export const logs_nojobshint2: (inputs: Logs_Nojobshint2Inputs) => LocalizedString;
export const logs_nosendjobsyet3: (inputs: Logs_Nosendjobsyet3Inputs) => LocalizedString;
export const logs_nosendjobshint3: (inputs: Logs_Nosendjobshint3Inputs) => LocalizedString;
export const logs_status: (inputs: Logs_StatusInputs) => LocalizedString;
export const logs_subject: (inputs: Logs_SubjectInputs) => LocalizedString;
export const logs_template: (inputs: Logs_TemplateInputs) => LocalizedString;
export const logs_sentfailedskipped2: (inputs: Logs_Sentfailedskipped2Inputs) => LocalizedString;
export const logs_started: (inputs: Logs_StartedInputs) => LocalizedString;
export const logs_duration: (inputs: Logs_DurationInputs) => LocalizedString;
export const logs_pausedprogress1: (inputs: Logs_Pausedprogress1Inputs) => LocalizedString;
export const logs_resuming: (inputs: Logs_ResumingInputs) => LocalizedString;
export const jobdetail_alllogs2: (inputs: Jobdetail_Alllogs2Inputs) => LocalizedString;
export const jobdetail_jobdetail2: (inputs: Jobdetail_Jobdetail2Inputs) => LocalizedString;
export const jobdetail_counts1: (inputs: Jobdetail_Counts1Inputs) => LocalizedString;
export const jobdetail_resume1: (inputs: Jobdetail_Resume1Inputs) => LocalizedString;
export const jobdetail_retryallfailures3: (inputs: Jobdetail_Retryallfailures3Inputs) => LocalizedString;
export const jobdetail_template1: (inputs: Jobdetail_Template1Inputs) => LocalizedString;
export const jobdetail_smtp1: (inputs: Jobdetail_Smtp1Inputs) => LocalizedString;
export const jobdetail_sender1: (inputs: Jobdetail_Sender1Inputs) => LocalizedString;
export const jobdetail_startedduration2: (inputs: Jobdetail_Startedduration2Inputs) => LocalizedString;
export const jobdetail_deletedprofile2: (inputs: Jobdetail_Deletedprofile2Inputs) => LocalizedString;
export const jobdetail_inline1: (inputs: Jobdetail_Inline1Inputs) => LocalizedString;
export const jobdetail_recipient1: (inputs: Jobdetail_Recipient1Inputs) => LocalizedString;
export const jobdetail_noemailaddress3: (inputs: Jobdetail_Noemailaddress3Inputs) => LocalizedString;
export const jobdetail_error1: (inputs: Jobdetail_Error1Inputs) => LocalizedString;
export const jobdetail_sentat2: (inputs: Jobdetail_Sentat2Inputs) => LocalizedString;
export const jobdetail_messageid2: (inputs: Jobdetail_Messageid2Inputs) => LocalizedString;
export const jobdetail_retry1: (inputs: Jobdetail_Retry1Inputs) => LocalizedString;
export const jobdetail_searchplaceholder2: (inputs: Jobdetail_Searchplaceholder2Inputs) => LocalizedString;
export const jobdetail_searcharia2: (inputs: Jobdetail_Searcharia2Inputs) => LocalizedString;
export const jobdetail_filterbystatus3: (inputs: Jobdetail_Filterbystatus3Inputs) => LocalizedString;
export const jobdetail_loadingjob2: (inputs: Jobdetail_Loadingjob2Inputs) => LocalizedString;
export const jobdetail_couldnotload3: (inputs: Jobdetail_Couldnotload3Inputs) => LocalizedString;
export const jobdetail_jobnotfound3: (inputs: Jobdetail_Jobnotfound3Inputs) => LocalizedString;
export const jobdetail_jobnotfoundhint4: (inputs: Jobdetail_Jobnotfoundhint4Inputs) => LocalizedString;
export const jobdetail_backtologs3: (inputs: Jobdetail_Backtologs3Inputs) => LocalizedString;
export const jobdetail_nomatchsearch3: (inputs: Jobdetail_Nomatchsearch3Inputs) => LocalizedString;
export const jobdetail_nomatchhint3: (inputs: Jobdetail_Nomatchhint3Inputs) => LocalizedString;
export const jobdetail_status1: (inputs: Jobdetail_Status1Inputs) => LocalizedString;
export const jobdetail_fixemail2: (inputs: Jobdetail_Fixemail2Inputs) => LocalizedString;
export const jobdetail_fixemailtitle3: (inputs: Jobdetail_Fixemailtitle3Inputs) => LocalizedString;
export const jobdetail_recipientdeletednoedit4: (inputs: Jobdetail_Recipientdeletednoedit4Inputs) => LocalizedString;
export const jobdetail_emailfixedretrying3: (inputs: Jobdetail_Emailfixedretrying3Inputs) => LocalizedString;
export const jobdetail_couldnotfixemail4: (inputs: Jobdetail_Couldnotfixemail4Inputs) => LocalizedString;
export const send_title: (inputs: Send_TitleInputs) => LocalizedString;
export const send_description: (inputs: Send_DescriptionInputs) => LocalizedString;
export const send_recipientsource1: (inputs: Send_Recipientsource1Inputs) => LocalizedString;
export const send_sourcefromjob2: (inputs: Send_Sourcefromjob2Inputs) => LocalizedString;
export const send_sourcefromjobhint3: (inputs: Send_Sourcefromjobhint3Inputs) => LocalizedString;
export const send_sourcefromlist2: (inputs: Send_Sourcefromlist2Inputs) => LocalizedString;
export const send_sourcefromlisthint3: (inputs: Send_Sourcefromlisthint3Inputs) => LocalizedString;
export const send_choosejob1: (inputs: Send_Choosejob1Inputs) => LocalizedString;
export const send_nogeneratejobsyet3: (inputs: Send_Nogeneratejobsyet3Inputs) => LocalizedString;
export const send_nogeneratejobshint3: (inputs: Send_Nogeneratejobshint3Inputs) => LocalizedString;
export const send_joboption1: (inputs: Send_Joboption1Inputs) => LocalizedString;
export const send_couldnotloadjobs3: (inputs: Send_Couldnotloadjobs3Inputs) => LocalizedString;
export const send_couldnotloadjob3: (inputs: Send_Couldnotloadjob3Inputs) => LocalizedString;
export const send_jobrecipients1: (inputs: Send_Jobrecipients1Inputs) => LocalizedString;
export const send_jobrecipientshint2: (inputs: Send_Jobrecipientshint2Inputs) => LocalizedString;
export const send_filterall1: (inputs: Send_Filterall1Inputs) => LocalizedString;
export const send_filterwithattachment2: (inputs: Send_Filterwithattachment2Inputs) => LocalizedString;
export const send_filterwithoutattachment2: (inputs: Send_Filterwithoutattachment2Inputs) => LocalizedString;
export const send_attachmentfilteraria2: (inputs: Send_Attachmentfilteraria2Inputs) => LocalizedString;
export const send_generatestatus1: (inputs: Send_Generatestatus1Inputs) => LocalizedString;
export const send_attachment: (inputs: Send_AttachmentInputs) => LocalizedString;
export const send_rowhasattachment2: (inputs: Send_Rowhasattachment2Inputs) => LocalizedString;
export const send_rownoattachment2: (inputs: Send_Rownoattachment2Inputs) => LocalizedString;
export const send_failedgeneratetitle2: (inputs: Send_Failedgeneratetitle2Inputs) => LocalizedString;
export const send_norecipientsinjob3: (inputs: Send_Norecipientsinjob3Inputs) => LocalizedString;
export const send_preflighthint1: (inputs: Send_Preflighthint1Inputs) => LocalizedString;
export const send_attachmentssummary1: (inputs: Send_Attachmentssummary1Inputs) => LocalizedString;
export const send_sendthese1: (inputs: Send_Sendthese1Inputs) => LocalizedString;
export const send_prefillretryone2: (inputs: Send_Prefillretryone2Inputs) => LocalizedString;
export const send_prefillretryother2: (inputs: Send_Prefillretryother2Inputs) => LocalizedString;
export const send_prefillreenterpassword2: (inputs: Send_Prefillreenterpassword2Inputs) => LocalizedString;
export const send_prefilldeletedone2: (inputs: Send_Prefilldeletedone2Inputs) => LocalizedString;
export const send_prefilldeletedother2: (inputs: Send_Prefilldeletedother2Inputs) => LocalizedString;
export const sendjob_selectrecipients2: (inputs: Sendjob_Selectrecipients2Inputs) => LocalizedString;
export const sendjob_writesubject2: (inputs: Sendjob_Writesubject2Inputs) => LocalizedString;
export const sendjob_writebody2: (inputs: Sendjob_Writebody2Inputs) => LocalizedString;
export const sendjob_entersender2: (inputs: Sendjob_Entersender2Inputs) => LocalizedString;
export const sendjob_chooseoneidentity3: (inputs: Sendjob_Chooseoneidentity3Inputs) => LocalizedString;
export const sendjob_norecipientsexist3: (inputs: Sendjob_Norecipientsexist3Inputs) => LocalizedString;
export const sendjob_alreadysending2: (inputs: Sendjob_Alreadysending2Inputs) => LocalizedString;
export const sendjob_anothersendactive3: (inputs: Sendjob_Anothersendactive3Inputs) => LocalizedString;
export const sendjob_stillpausing2: (inputs: Sendjob_Stillpausing2Inputs) => LocalizedString;
export const sendjob_onlysendingcanpause4: (inputs: Sendjob_Onlysendingcanpause4Inputs) => LocalizedString;
export const sendjob_onlypausedcanresume4: (inputs: Sendjob_Onlypausedcanresume4Inputs) => LocalizedString;
export const sendjob_finishedcannotcancel3: (inputs: Sendjob_Finishedcannotcancel3Inputs) => LocalizedString;
export const sendjob_onlyfinishedcanretry4: (inputs: Sendjob_Onlyfinishedcanretry4Inputs) => LocalizedString;
export const sendjob_nofailedrecipients3: (inputs: Sendjob_Nofailedrecipients3Inputs) => LocalizedString;
export const sendjob_attachmentsmissingondisk4: (inputs: Sendjob_Attachmentsmissingondisk4Inputs) => LocalizedString;
export const sendjob_generatejobmissing3: (inputs: Sendjob_Generatejobmissing3Inputs) => LocalizedString;
export const sendjob_recipientdeleted2: (inputs: Sendjob_Recipientdeleted2Inputs) => LocalizedString;
export const sendjob_recipientnoemail3: (inputs: Sendjob_Recipientnoemail3Inputs) => LocalizedString;
export const sendjob_noattachmentforrecipient4: (inputs: Sendjob_Noattachmentforrecipient4Inputs) => LocalizedString;
export const sendjob_retriesexhausted2: (inputs: Sendjob_Retriesexhausted2Inputs) => LocalizedString;
export const sendjob_couldnotresumejob4: (inputs: Sendjob_Couldnotresumejob4Inputs) => LocalizedString;
export const sendjob_quitinprogress3: (inputs: Sendjob_Quitinprogress3Inputs) => LocalizedString;
export const sendjob_quitandpause3: (inputs: Sendjob_Quitandpause3Inputs) => LocalizedString;
export const sendjob_keepsending2: (inputs: Sendjob_Keepsending2Inputs) => LocalizedString;
export const sendjob_launchbanner2: (inputs: Sendjob_Launchbanner2Inputs) => LocalizedString;
export const sendjob_credentialunreadable2: (inputs: Sendjob_Credentialunreadable2Inputs) => LocalizedString;
export const generatejob_templatemissing2: (inputs: Generatejob_Templatemissing2Inputs) => LocalizedString;
export const generatejob_templatefilemissing3: (inputs: Generatejob_Templatefilemissing3Inputs) => LocalizedString;
export const generatejob_libreofficemissing3: (inputs: Generatejob_Libreofficemissing3Inputs) => LocalizedString;
export const generatejob_recipientdeleted2: (inputs: Generatejob_Recipientdeleted2Inputs) => LocalizedString;
export const generatejob_missingslotdata3: (inputs: Generatejob_Missingslotdata3Inputs) => LocalizedString;
export const generatejob_couldnotfill3: (inputs: Generatejob_Couldnotfill3Inputs) => LocalizedString;
export const generatejob_nopdfproduced3: (inputs: Generatejob_Nopdfproduced3Inputs) => LocalizedString;
export const generatejob_selectrecipients2: (inputs: Generatejob_Selectrecipients2Inputs) => LocalizedString;
export const generatejob_norecipientsexist3: (inputs: Generatejob_Norecipientsexist3Inputs) => LocalizedString;
export const generatejob_jobcouldnotbecreated5: (inputs: Generatejob_Jobcouldnotbecreated5Inputs) => LocalizedString;
export const generatejob_nofreefilename4: (inputs: Generatejob_Nofreefilename4Inputs) => LocalizedString;
export const generatejob_unassignedtemplatevalues3: (inputs: Generatejob_Unassignedtemplatevalues3Inputs) => LocalizedString;
export const generatejob_unassignedtemplatevalue3: (inputs: Generatejob_Unassignedtemplatevalue3Inputs) => LocalizedString;
export const generatejob_routingcolumnrequired3: (inputs: Generatejob_Routingcolumnrequired3Inputs) => LocalizedString;
export const templatesservice_docxonly2: (inputs: Templatesservice_Docxonly2Inputs) => LocalizedString;
export const templatesservice_couldnotread3: (inputs: Templatesservice_Couldnotread3Inputs) => LocalizedString;
export const fontsservice_invalidfontfile3: (inputs: Fontsservice_Invalidfontfile3Inputs) => LocalizedString;
export const fontsservice_couldnotread3: (inputs: Fontsservice_Couldnotread3Inputs) => LocalizedString;
export const importservice_nonamecolumn3: (inputs: Importservice_Nonamecolumn3Inputs) => LocalizedString;
export const importservice_noemailcolumn3: (inputs: Importservice_Noemailcolumn3Inputs) => LocalizedString;
export const importservice_notexcel2: (inputs: Importservice_Notexcel2Inputs) => LocalizedString;
export const importservice_duplicateheaders2: (inputs: Importservice_Duplicateheaders2Inputs) => LocalizedString;
export const importservice_rowsskippedemptyname4: (inputs: Importservice_Rowsskippedemptyname4Inputs) => LocalizedString;
export const validation_smtpnamerequired2: (inputs: Validation_Smtpnamerequired2Inputs) => LocalizedString;
export const validation_smtphostrequired2: (inputs: Validation_Smtphostrequired2Inputs) => LocalizedString;
export const validation_smtpportinvalid2: (inputs: Validation_Smtpportinvalid2Inputs) => LocalizedString;
export const validation_smtpusernamerequired2: (inputs: Validation_Smtpusernamerequired2Inputs) => LocalizedString;
export const validation_smtppasswordrequired2: (inputs: Validation_Smtppasswordrequired2Inputs) => LocalizedString;
export const validation_templatenamerequired2: (inputs: Validation_Templatenamerequired2Inputs) => LocalizedString;
export const validation_templateneedsslot2: (inputs: Validation_Templateneedsslot2Inputs) => LocalizedString;
export const validation_templatepatternneedsslot3: (inputs: Validation_Templatepatternneedsslot3Inputs) => LocalizedString;
export const validation_templatepatternunknownslot3: (inputs: Validation_Templatepatternunknownslot3Inputs) => LocalizedString;
export const validation_messagetemplatenamerequired3: (inputs: Validation_Messagetemplatenamerequired3Inputs) => LocalizedString;
export const validation_messagesubjectrequired2: (inputs: Validation_Messagesubjectrequired2Inputs) => LocalizedString;
export const validation_messagebodyrequired2: (inputs: Validation_Messagebodyrequired2Inputs) => LocalizedString;
export const validation_slotlayoutinvalid2: (inputs: Validation_Slotlayoutinvalid2Inputs) => LocalizedString;
export const validation_patternslotmissingintemplate4: (inputs: Validation_Patternslotmissingintemplate4Inputs) => LocalizedString;
export const dialogs_excelfilter1: (inputs: Dialogs_Excelfilter1Inputs) => LocalizedString;
export const dialogs_templatefilter1: (inputs: Dialogs_Templatefilter1Inputs) => LocalizedString;
export const dialogs_pdffilter1: (inputs: Dialogs_Pdffilter1Inputs) => LocalizedString;
export const dialogs_fontfilter1: (inputs: Dialogs_Fontfilter1Inputs) => LocalizedString;
export const messages_documentstab1: (inputs: Messages_Documentstab1Inputs) => LocalizedString;
export const messages_messagestab1: (inputs: Messages_Messagestab1Inputs) => LocalizedString;
export const messages_addmessagetemplate2: (inputs: Messages_Addmessagetemplate2Inputs) => LocalizedString;
export const messages_countone1: (inputs: Messages_Countone1Inputs) => LocalizedString;
export const messages_countother1: (inputs: Messages_Countother1Inputs) => LocalizedString;
export const messages_notemplatesyet2: (inputs: Messages_Notemplatesyet2Inputs) => LocalizedString;
export const messages_notemplateshint2: (inputs: Messages_Notemplateshint2Inputs) => LocalizedString;
export const messages_addtitle1: (inputs: Messages_Addtitle1Inputs) => LocalizedString;
export const messages_edittitle1: (inputs: Messages_Edittitle1Inputs) => LocalizedString;
export const messages_edit: (inputs: Messages_EditInputs) => LocalizedString;
export const messages_registered: (inputs: Messages_RegisteredInputs) => LocalizedString;
export const messages_saved: (inputs: Messages_SavedInputs) => LocalizedString;
export const messages_deleted: (inputs: Messages_DeletedInputs) => LocalizedString;
export const messages_couldnotload2: (inputs: Messages_Couldnotload2Inputs) => LocalizedString;
export const messages_couldnotsave2: (inputs: Messages_Couldnotsave2Inputs) => LocalizedString;
export const messages_couldnotdelete2: (inputs: Messages_Couldnotdelete2Inputs) => LocalizedString;
export const messages_updatedstamp1: (inputs: Messages_Updatedstamp1Inputs) => LocalizedString;
export const messages_bodyhint1: (inputs: Messages_Bodyhint1Inputs) => LocalizedString;
export const messages_norecipientshint2: (inputs: Messages_Norecipientshint2Inputs) => LocalizedString;
export const messages_picklabel1: (inputs: Messages_Picklabel1Inputs) => LocalizedString;
export const messages_pickplaceholder1: (inputs: Messages_Pickplaceholder1Inputs) => LocalizedString;
export const messages_saveas1: (inputs: Messages_Saveas1Inputs) => LocalizedString;
export const messages_saveastitle2: (inputs: Messages_Saveastitle2Inputs) => LocalizedString;
export const messages_saveasdescription2: (inputs: Messages_Saveasdescription2Inputs) => LocalizedString;
export const messages_saveascreated2: (inputs: Messages_Saveascreated2Inputs) => LocalizedString;
export const messages_deletetitle1: (inputs: Messages_Deletetitle1Inputs) => LocalizedString;
export const messages_deletedescription1: (inputs: Messages_Deletedescription1Inputs) => LocalizedString;
export const messages_subjectdetail1: (inputs: Messages_Subjectdetail1Inputs) => LocalizedString;
export const messages_bodydetail1: (inputs: Messages_Bodydetail1Inputs) => LocalizedString;
export const messages_nobodyyet2: (inputs: Messages_Nobodyyet2Inputs) => LocalizedString;
export const messages_copyonpickhint3: (inputs: Messages_Copyonpickhint3Inputs) => LocalizedString;
export const messages_savetemplate1: (inputs: Messages_Savetemplate1Inputs) => LocalizedString;
export const messages_name: (inputs: Messages_NameInputs) => LocalizedString;
export const generate_title: (inputs: Generate_TitleInputs) => LocalizedString;
export const generate_description: (inputs: Generate_DescriptionInputs) => LocalizedString;
export const generate_pastjobs1: (inputs: Generate_Pastjobs1Inputs) => LocalizedString;
export const generate_pastjobsempty2: (inputs: Generate_Pastjobsempty2Inputs) => LocalizedString;
export const generate_jobtemplate1: (inputs: Generate_Jobtemplate1Inputs) => LocalizedString;
export const generate_jobstatus1: (inputs: Generate_Jobstatus1Inputs) => LocalizedString;
export const generate_jobcreated1: (inputs: Generate_Jobcreated1Inputs) => LocalizedString;
export const generate_reopenjob1: (inputs: Generate_Reopenjob1Inputs) => LocalizedString;
export const generate_reopenedtitle1: (inputs: Generate_Reopenedtitle1Inputs) => LocalizedString;
export const generate_savepdf1: (inputs: Generate_Savepdf1Inputs) => LocalizedString;
export const generate_couldnotsavepdf3: (inputs: Generate_Couldnotsavepdf3Inputs) => LocalizedString;
export const generate_couldnotloadjobs3: (inputs: Generate_Couldnotloadjobs3Inputs) => LocalizedString;
export const generate_couldnotreopenjob3: (inputs: Generate_Couldnotreopenjob3Inputs) => LocalizedString;
export const generate_jobnolongerexists3: (inputs: Generate_Jobnolongerexists3Inputs) => LocalizedString;
export const generate_startdisabledcoverage2: (inputs: Generate_Startdisabledcoverage2Inputs) => LocalizedString;
export const generate_retryjobhint2: (inputs: Generate_Retryjobhint2Inputs) => LocalizedString;
export const generate_prefilldeletedone2: (inputs: Generate_Prefilldeletedone2Inputs) => LocalizedString;
export const generate_prefilldeletedother2: (inputs: Generate_Prefilldeletedother2Inputs) => LocalizedString;
export const generate_routingtitle1: (inputs: Generate_Routingtitle1Inputs) => LocalizedString;
export const generate_routinghint1: (inputs: Generate_Routinghint1Inputs) => LocalizedString;
export const generate_routingcolumnlabel2: (inputs: Generate_Routingcolumnlabel2Inputs) => LocalizedString;
export const generate_routingcolumnnone2: (inputs: Generate_Routingcolumnnone2Inputs) => LocalizedString;
export const generate_routingcolumnsuggested2: (inputs: Generate_Routingcolumnsuggested2Inputs) => LocalizedString;
export const generate_defaulttemplatelabel2: (inputs: Generate_Defaulttemplatelabel2Inputs) => LocalizedString;
export const generate_defaulttemplatehint2: (inputs: Generate_Defaulttemplatehint2Inputs) => LocalizedString;
export const generate_assignmenttitle1: (inputs: Generate_Assignmenttitle1Inputs) => LocalizedString;
export const generate_assignmenthint1: (inputs: Generate_Assignmenthint1Inputs) => LocalizedString;
export const generate_assignedto1: (inputs: Generate_Assignedto1Inputs) => LocalizedString;
export const generate_valuecountone2: (inputs: Generate_Valuecountone2Inputs) => LocalizedString;
export const generate_valuecountother2: (inputs: Generate_Valuecountother2Inputs) => LocalizedString;
export const generate_unassignedsummary1: (inputs: Generate_Unassignedsummary1Inputs) => LocalizedString;
export const generate_unassignedvalueone2: (inputs: Generate_Unassignedvalueone2Inputs) => LocalizedString;
export const generate_unassignedvalueother2: (inputs: Generate_Unassignedvalueother2Inputs) => LocalizedString;
export const generate_allvaluesassigned2: (inputs: Generate_Allvaluesassigned2Inputs) => LocalizedString;
export const generate_patternlabel1: (inputs: Generate_Patternlabel1Inputs) => LocalizedString;
export const generate_patternhint1: (inputs: Generate_Patternhint1Inputs) => LocalizedString;
export const generate_jobpatternplaceholder2: (inputs: Generate_Jobpatternplaceholder2Inputs) => LocalizedString;
export const generate_templatecoverageok2: (inputs: Generate_Templatecoverageok2Inputs) => LocalizedString;
export const generate_templatecoveragemissing2: (inputs: Generate_Templatecoveragemissing2Inputs) => LocalizedString;
export const generate_startdisabledrouting2: (inputs: Generate_Startdisabledrouting2Inputs) => LocalizedString;
export const generate_startdisabledpattern2: (inputs: Generate_Startdisabledpattern2Inputs) => LocalizedString;
export const generate_allblankvalues2: (inputs: Generate_Allblankvalues2Inputs) => LocalizedString;
export const generate_unassignedsummaryone2: (inputs: Generate_Unassignedsummaryone2Inputs) => LocalizedString;
export const update_title: (inputs: Update_TitleInputs) => LocalizedString;
export const update_checknow1: (inputs: Update_Checknow1Inputs) => LocalizedString;
export const update_checking: (inputs: Update_CheckingInputs) => LocalizedString;
export const update_checkfailed1: (inputs: Update_Checkfailed1Inputs) => LocalizedString;
export const update_uptodate2: (inputs: Update_Uptodate2Inputs) => LocalizedString;
export const update_available: (inputs: Update_AvailableInputs) => LocalizedString;
export const update_downloading: (inputs: Update_DownloadingInputs) => LocalizedString;
export const update_ready: (inputs: Update_ReadyInputs) => LocalizedString;
export const update_download: (inputs: Update_DownloadInputs) => LocalizedString;
export const update_openreleasepage2: (inputs: Update_Openreleasepage2Inputs) => LocalizedString;
export const update_replacemanually1: (inputs: Update_Replacemanually1Inputs) => LocalizedString;
export const update_restartandinstall2: (inputs: Update_Restartandinstall2Inputs) => LocalizedString;
export const update_updatedto1: (inputs: Update_Updatedto1Inputs) => LocalizedString;
export const update_unsupported: (inputs: Update_UnsupportedInputs) => LocalizedString;
export const update_errorcheck1: (inputs: Update_Errorcheck1Inputs) => LocalizedString;
export const update_errordownload1: (inputs: Update_Errordownload1Inputs) => LocalizedString;
export const update_erroractivejob2: (inputs: Update_Erroractivejob2Inputs) => LocalizedString;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_BackInputs = {};
export type Common_NextInputs = {};
export type Common_CancelInputs = {};
export type Common_SaveInputs = {};
export type Common_DeleteInputs = {};
export type Common_RetryInputs = {};
export type Common_ResumeInputs = {};
export type Common_PauseInputs = {};
export type Common_PrevInputs = {};
export type Common_ClearInputs = {};
export type Common_DismissInputs = {};
export type Common_BrowseInputs = {};
export type Common_LoadingInputs = {};
export type Common_SavedInputs = {};
export type Common_SavingInputs = {};
export type Common_DeletingInputs = {};
export type Common_TestingInputs = {};
export type Common_Closedetails1Inputs = {};
export type Common_Couldnotload2Inputs = {
    key: NonNullable<unknown>;
};
export type Common_Couldnotsave2Inputs = {
    key: NonNullable<unknown>;
};
export type Common_Retryfailures1Inputs = {};
export type Common_CloseInputs = {};
export type Nav_ImportInputs = {};
export type Nav_RecipientsInputs = {};
export type Nav_TemplatesInputs = {};
export type Nav_LogsInputs = {};
export type Nav_SettingsInputs = {};
export type Nav_GenerateInputs = {};
export type Nav_SendInputs = {};
export type App_Backendunreachable1Inputs = {};
export type Welcome_TitleInputs = {};
export type Welcome_SubtitleInputs = {};
export type Welcome_Checkinglibreoffice2Inputs = {};
export type Welcome_Libreofficepurpose2Inputs = {};
export type Welcome_Libreofficefound2Inputs = {};
export type Welcome_Libreofficemissing2Inputs = {};
export type Welcome_Libreofficemissingdetail3Inputs = {};
export type Welcome_Installwith1Inputs = {};
export type Welcome_Downloadfrom1Inputs = {};
export type Welcome_Checkagain1Inputs = {};
export type Welcome_Templatesfolder1Inputs = {};
export type Welcome_Outputfolder1Inputs = {};
export type Welcome_Settingup1Inputs = {};
export type Welcome_Getstarted1Inputs = {};
export type Status_PendingInputs = {};
export type Status_SendingInputs = {};
export type Status_PausedInputs = {};
export type Status_CompletedInputs = {};
export type Status_CancelledInputs = {};
export type Status_FailedInputs = {};
export type Status_SkippedInputs = {};
export type Status_SentInputs = {};
export type Status_GeneratingInputs = {};
export type Status_GeneratedInputs = {};
export type Settingspage_Title1Inputs = {};
export type Settingspage_Description1Inputs = {};
export type Settingspage_Ratelimiting2Inputs = {};
export type Settingspage_Ratelimitingdescription3Inputs = {};
export type Settingspage_Msperemail3Inputs = {
    ms: NonNullable<unknown>;
};
export type Settingspage_Delaybetweenemails3Inputs = {};
export type Settingspage_Defaultfolders2Inputs = {};
export type Settingspage_Defaultfoldersdescription3Inputs = {};
export type Settingspage_Templatesfolder2Inputs = {};
export type Settingspage_Outputfolder2Inputs = {};
export type Settingspage_About1Inputs = {};
export type Settingspage_App1Inputs = {};
export type Settingspage_Version1Inputs = {};
export type Settingspage_Data1Inputs = {};
export type Settingspage_Storedlocally2Inputs = {};
export type Settingspage_Language1Inputs = {};
export type Settingspage_Languagedescription2Inputs = {};
export type Settingspage_Ratepersecondone4Inputs = {
    rate: NonNullable<unknown>;
};
export type Settingspage_Ratepersecondother4Inputs = {
    rate: NonNullable<unknown>;
};
export type Settingspage_Couldnotload3Inputs = {};
export type Smtp_TitleInputs = {};
export type Smtp_DescriptionInputs = {};
export type Smtp_Addprofile1Inputs = {};
export type Smtp_Profilesaved1Inputs = {
    name: NonNullable<unknown>;
};
export type Smtp_Profiledeleted1Inputs = {};
export type Smtp_Couldnotsaveprofile3Inputs = {};
export type Smtp_Couldnotdeleteprofile3Inputs = {};
export type Smtp_Couldnotloadprofiles3Inputs = {};
export type Smtp_Loadingprofiles1Inputs = {};
export type Smtp_Noprofilesyet2Inputs = {};
export type Smtp_Noprofilesdescription2Inputs = {};
export type Smtp_Testconnection1Inputs = {};
export type Smtp_Connectionok1Inputs = {};
export type Smtp_ConnectedInputs = {};
export type Smtp_Connectionfailed1Inputs = {};
export type Smtp_Passwordnotset2Inputs = {};
export type Smtp_Addprofiletitle2Inputs = {};
export type Smtp_Editprofiletitle2Inputs = {
    name: NonNullable<unknown>;
};
export type Smtp_Createhint1Inputs = {};
export type Smtp_Edithint1Inputs = {};
export type Smtp_Profilename1Inputs = {};
export type Smtp_Smtphost1Inputs = {};
export type Smtp_PortInputs = {};
export type Smtp_Implicittls1Inputs = {};
export type Smtp_StarttlsInputs = {};
export type Smtp_UsernameInputs = {};
export type Smtp_Apppassword1Inputs = {};
export type Smtp_Leaveblanktokeep3Inputs = {};
export type Smtp_Gmailapppasswordhint3Inputs = {};
export type Smtp_Defaultsendername2Inputs = {};
export type Smtp_Defaultsenderaddress2Inputs = {};
export type Smtp_Replyto1Inputs = {};
export type Smtp_Identityhint1Inputs = {};
export type Smtp_Saveprofile1Inputs = {};
export type Smtp_Savechanges1Inputs = {};
export type Smtp_Deleteprofiletitle2Inputs = {
    name: NonNullable<unknown>;
};
export type Smtp_Deleteprofiledescription2Inputs = {};
export type Smtp_Passwordlabel1Inputs = {};
export type Compose_Steprecipients1Inputs = {};
export type Compose_Steptemplate1Inputs = {};
export type Compose_Stepmessage1Inputs = {};
export type Compose_Stepsmtp1Inputs = {};
export type Compose_Stepgenerate1Inputs = {};
export type Compose_Stepsend1Inputs = {};
export type Compose_Writesubjecttocontinue3Inputs = {};
export type Compose_Writebodytocontinue3Inputs = {};
export type Compose_Completesmtpdetails2Inputs = {};
export type Compose_Searchrecipients1Inputs = {};
export type Compose_Searchplaceholder1Inputs = {};
export type Compose_Filterbybatch2Inputs = {};
export type Compose_Allbatches1Inputs = {};
export type Compose_Batchoption1Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
export type Compose_Selectallmatchingtitle3Inputs = {
    total: NonNullable<unknown>;
};
export type Compose_Selectallcount2Inputs = {
    total: NonNullable<unknown>;
};
export type Compose_Couldnotloadrecipients3Inputs = {};
export type Compose_Norecipientsyet2Inputs = {};
export type Compose_Norecipientsmatchfilter3Inputs = {};
export type Compose_Norecipientshint2Inputs = {};
export type Compose_Gotoimport2Inputs = {};
export type Compose_Trydifferentfilter2Inputs = {};
export type Compose_Selectallonpage3Inputs = {};
export type Compose_NameInputs = {};
export type Compose_EmailInputs = {};
export type Compose_PhoneInputs = {};
export type Compose_Selectrecipient1Inputs = {
    name: NonNullable<unknown>;
};
export type Compose_Selectioncount1Inputs = {
    selected: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Pageof1Inputs = {
    page: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Templatelabel1Inputs = {};
export type Compose_Choosetemplate1Inputs = {};
export type Compose_Notemplatesregistered2Inputs = {};
export type Compose_Registertemplatelink2Inputs = {};
export type Compose_Notemplatesregisteredhint3Inputs = {};
export type Compose_Requiredslots1Inputs = {};
export type Compose_Outputpattern1Inputs = {};
export type Compose_Allcovered1Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Missingdatasummary2Inputs = {
    missing: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Compose_Missingdatahint2Inputs = {};
export type Compose_SubjectInputs = {};
export type Compose_Subjectplaceholder1Inputs = {
    name: NonNullable<unknown>;
    instansi: NonNullable<unknown>;
};
export type Compose_Bodylabel1Inputs = {};
export type Compose_Bodyplaceholder1Inputs = {
    name: NonNullable<unknown>;
};
export type Compose_Unknownslothint2Inputs = {};
export type Compose_Missingslottitle2Inputs = {
    list: NonNullable<unknown>;
};
export type Compose_Missingslothint2Inputs = {};
export type Compose_Livepreview1Inputs = {};
export type Compose_Previewfor1Inputs = {
    name: NonNullable<unknown>;
};
export type Compose_Emailconnection1Inputs = {};
export type Compose_Savedprofile1Inputs = {};
export type Compose_Enterdetails1Inputs = {};
export type Compose_Chooseprofile1Inputs = {};
export type Compose_Nosavedprofileshint3Inputs = {};
export type Compose_Settingslink1Inputs = {};
export type Compose_HostInputs = {};
export type Compose_Portlabel1Inputs = {};
export type Compose_Usernamelabel1Inputs = {};
export type Compose_Apppasswordlabel2Inputs = {};
export type Compose_Saveasprofile2Inputs = {};
export type Compose_Profilenameplaceholder2Inputs = {};
export type Compose_Testconnectionbutton2Inputs = {};
export type Compose_Senderidentity1Inputs = {};
export type Compose_Sendername1Inputs = {};
export type Compose_Senderaddress1Inputs = {};
export type Compose_Replyto1Inputs = {};
export type Compose_Senderdomainmismatch2Inputs = {
    provider: NonNullable<unknown>;
    domain: NonNullable<unknown>;
    from: NonNullable<unknown>;
};
export type Compose_Senderdiffersfromprofile3Inputs = {
    address: NonNullable<unknown>;
};
export type Compose_Sendingrate1Inputs = {};
export type Compose_Sendingratems2Inputs = {
    ms: NonNullable<unknown>;
};
export type Compose_Sendingratehint2Inputs = {};
export type Compose_Generationfailed1Inputs = {};
export type Compose_Connectionfailed1Inputs = {};
export type Compose_Choosetemplatefirst2Inputs = {};
export type Compose_Campaignsummary1Inputs = {};
export type Compose_RecipientsInputs = {};
export type Compose_TemplateInputs = {};
export type Compose_Outputfolder1Inputs = {};
export type Compose_Campaignsummaryhint2Inputs = {};
export type Compose_Generatepdfs1Inputs = {};
export type Compose_GeneratingInputs = {};
export type Compose_Oftotal1Inputs = {
    current: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Generatedcounts1Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    pending: NonNullable<unknown>;
};
export type Compose_Tryagain1Inputs = {};
export type Compose_Allgenerated1Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Generatedwithfailures2Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
export type Compose_Failedrecipientstitle2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Spotcheck1Inputs = {};
export type Compose_Spotindex1Inputs = {
    index: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Loadingpreview1Inputs = {};
export type Compose_Sendsummary1Inputs = {};
export type Compose_SenderInputs = {};
export type Compose_ConnectionInputs = {};
export type Compose_PacingInputs = {};
export type Compose_AttachmentsInputs = {};
export type Compose_Preparingsend1Inputs = {};
export type Compose_SendingInputs = {};
export type Compose_Sendcounts1Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    pending: NonNullable<unknown>;
};
export type Compose_Windingdowntitle2Inputs = {};
export type Compose_Cancelsendconfirm2Inputs = {
    current: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Compose_Perrecipientlog2Inputs = {};
export type Compose_Waitingfirstemail2Inputs = {};
export type Compose_Allemailssent2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Sentwithfailures2Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
export type Compose_Sendcancelled1Inputs = {};
export type Compose_Cancelleddetail1Inputs = {
    sent: NonNullable<unknown>;
    skipped: NonNullable<unknown>;
};
export type Compose_RecipientInputs = {};
export type Compose_Rowskipped1Inputs = {};
export type Compose_Sendingfailed1Inputs = {};
export type Compose_Couldnotstartsend3Inputs = {};
export type Compose_Couldnotpausesend3Inputs = {};
export type Compose_Couldnotcancelsend3Inputs = {};
export type Compose_Couldnotretryfailures3Inputs = {};
export type Compose_Sendjobnolongerexists4Inputs = {};
export type Compose_Couldnotresumesend3Inputs = {};
export type Compose_Slotmissingcountone3Inputs = {
    slot: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Compose_Slotmissingcountother3Inputs = {
    slot: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Compose_Unknownslottitleone3Inputs = {
    list: NonNullable<unknown>;
};
export type Compose_Unknownslottitleother3Inputs = {
    list: NonNullable<unknown>;
};
export type Compose_Livepreviewhintone3Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Livepreviewhintother3Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Sendcountone2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Sendcountother2Inputs = {
    count: NonNullable<unknown>;
};
export type Compose_Apppasswordplaceholder2Inputs = {};
export type Compose_Replytoplaceholder2Inputs = {};
export type Templates_TitleInputs = {};
export type Templates_Addtemplate1Inputs = {};
export type Templates_Templateregistered1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Templatesaved1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Templatedeleted1Inputs = {};
export type Templates_Couldnotregister2Inputs = {};
export type Templates_Couldnotsave2Inputs = {};
export type Templates_Couldnotdelete2Inputs = {};
export type Templates_Couldnotload2Inputs = {};
export type Templates_Loadingtemplates1Inputs = {};
export type Templates_Notemplatesyet2Inputs = {};
export type Templates_Notemplateshint2Inputs = {};
export type Templates_Unsupportedfile1Inputs = {
    fileName: NonNullable<unknown>;
};
export type Templates_RegisteredInputs = {};
export type Templates_SlotsInputs = {};
export type Templates_Noslotsdeclared2Inputs = {};
export type Templates_Outputpatternhint2Inputs = {};
export type Templates_Editexternallyhint2Inputs = {};
export type Templates_EditInputs = {};
export type Templates_Addtitle1Inputs = {};
export type Templates_Edittitle1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Templatename1Inputs = {};
export type Templates_ScanningInputs = {};
export type Templates_Rescanfromfile2Inputs = {};
export type Templates_Rescanconfirm1Inputs = {};
export type Templates_Replaceslots1Inputs = {};
export type Templates_Keepmyslots2Inputs = {};
export type Templates_Docxslotshint2Inputs = {
    placeholders: NonNullable<unknown>;
};
export type Templates_Imageslotshint2Inputs = {};
export type Templates_Couldnotscan2Inputs = {};
export type Templates_Slotscanbetyped3Inputs = {};
export type Templates_Slotaria1Inputs = {
    index: NonNullable<unknown>;
};
export type Templates_Removeslotaria2Inputs = {
    index: NonNullable<unknown>;
};
export type Templates_Addslot1Inputs = {};
export type Templates_Outputpatternfield2Inputs = {};
export type Templates_Outputpatternplaceholder2Inputs = {
    no: NonNullable<unknown>;
    name: NonNullable<unknown>;
};
export type Templates_Registertemplate1Inputs = {};
export type Templates_Savechanges1Inputs = {};
export type Templates_Deletetitle1Inputs = {
    name: NonNullable<unknown>;
};
export type Templates_Deletedescription1Inputs = {};
export type Templates_Thistemplate1Inputs = {};
export type Templates_Countregisteredone2Inputs = {
    count: NonNullable<unknown>;
};
export type Templates_Countregisteredother2Inputs = {
    count: NonNullable<unknown>;
};
export type Templates_Slotcountone2Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
export type Templates_Slotcountother2Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
export type Templates_Slotlayouttitle2Inputs = {};
export type Templates_Slotlayouthint2Inputs = {};
export type Templates_Slotlayoutdone2Inputs = {};
export type Templates_Slotlayoutimagefailed3Inputs = {};
export type Templates_Positiontextonimage3Inputs = {};
export type Templates_Slotx1Inputs = {};
export type Templates_Sloty1Inputs = {};
export type Templates_Slotfontsize2Inputs = {};
export type Templates_Slotmaxwidth2Inputs = {};
export type Templates_Slotmaxwidthauto3Inputs = {};
export type Templates_Slotcolor1Inputs = {};
export type Templates_Slotalign1Inputs = {};
export type Templates_Slotalignleft2Inputs = {};
export type Templates_Slotaligncenter2Inputs = {};
export type Templates_Slotalignright2Inputs = {};
export type Templates_Slotfontface2Inputs = {};
export type Templates_Slotfontfacedefault3Inputs = {};
export type Templates_Addfont1Inputs = {};
export type Templates_Fontadded1Inputs = {
    family: NonNullable<unknown>;
};
export type Templates_Fontaddfailed2Inputs = {};
export type Templates_Fontlistfailed2Inputs = {};
export type Importpage_Title1Inputs = {};
export type Importpage_Description1Inputs = {};
export type Importpage_Allowduplicates2Inputs = {};
export type Importpage_Allowduplicateshint3Inputs = {};
export type Importpage_Importanotherfile3Inputs = {};
export type Importpage_Dragdrophint3Inputs = {};
export type Importpage_Fileformathint3Inputs = {};
export type Importpage_Parsing1Inputs = {
    fileName: NonNullable<unknown>;
};
export type Importpage_Importcomplete2Inputs = {};
export type Importpage_Gotorecipients3Inputs = {};
export type Importpage_Couldnotread3Inputs = {};
export type Importpage_Notexcelfile3Inputs = {
    fileName: NonNullable<unknown>;
};
export type Importpage_Couldnotcommit3Inputs = {};
export type Importpage_Preview1Inputs = {};
export type Importpage_Previewrows2Inputs = {
    fileName: NonNullable<unknown>;
    shown: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Importpage_Columnmapping2Inputs = {};
export type Importpage_Columnmappinghint3Inputs = {};
export type Importpage_Columnrolearia3Inputs = {
    column: NonNullable<unknown>;
};
export type Importpage_Resetmapping2Inputs = {};
export type Importpage_Selectnamecolumn3Inputs = {};
export type Importpage_Importing1Inputs = {};
export type Importpage_Importrecipients2Inputs = {};
export type Importpage_Nodatarows3Inputs = {};
export type Importpage_Rolename2Inputs = {};
export type Importpage_Roleemail2Inputs = {};
export type Importpage_Rolephone2Inputs = {};
export type Importpage_Rolemetadata2Inputs = {};
export type Importpage_Roleskip2Inputs = {};
export type Importpage_Importcompletedetailone4Inputs = {
    imported: NonNullable<unknown>;
    fileName: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Importcompletedetailother4Inputs = {
    imported: NonNullable<unknown>;
    fileName: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Rowsskippednonameone5Inputs = {
    count: NonNullable<unknown>;
};
export type Importpage_Rowsskippednonameother5Inputs = {
    count: NonNullable<unknown>;
};
export type Importpage_Importedtoastone3Inputs = {
    imported: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Importedtoastother3Inputs = {
    imported: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
export type Importpage_Duplicatesskippedparsingone4Inputs = {
    count: NonNullable<unknown>;
};
export type Importpage_Duplicatesskippedparsingother4Inputs = {
    count: NonNullable<unknown>;
};
export type Importpage_Gotogenerate3Inputs = {};
export type Importpage_Roletemplate2Inputs = {};
export type Recipients_TitleInputs = {};
export type Recipients_Couldnotdelete2Inputs = {};
export type Recipients_Deleteselected1Inputs = {};
export type Recipients_Deleteselectedcount2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Searchplaceholder1Inputs = {};
export type Recipients_Searcharia1Inputs = {};
export type Recipients_Filterbybatch2Inputs = {};
export type Recipients_Allbatches1Inputs = {};
export type Recipients_Couldnotload2Inputs = {};
export type Recipients_Loadingrecipients1Inputs = {};
export type Recipients_Norecipientsyet2Inputs = {};
export type Recipients_Norecipientshint2Inputs = {};
export type Recipients_Gotoimport2Inputs = {};
export type Recipients_Nomatchfilters2Inputs = {};
export type Recipients_Nomatchhint2Inputs = {};
export type Recipients_Clearfilters1Inputs = {};
export type Recipients_Showingrange1Inputs = {
    from: NonNullable<unknown>;
    to: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Recipients_PreviousInputs = {};
export type Recipients_NextInputs = {};
export type Recipients_Pageof1Inputs = {
    page: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Recipients_Selectallonpage3Inputs = {};
export type Recipients_NameInputs = {};
export type Recipients_EmailInputs = {};
export type Recipients_PhoneInputs = {};
export type Recipients_Importbatch1Inputs = {};
export type Recipients_ImportedInputs = {};
export type Recipients_Selectrecipient1Inputs = {
    name: NonNullable<unknown>;
};
export type Recipients_Noemailaddress2Inputs = {};
export type Recipients_Customfields1Inputs = {};
export type Recipients_Nocustomfields2Inputs = {};
export type Recipients_Deletedescription1Inputs = {};
export type Recipients_Countindirectoryone3Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Countindirectoryother3Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletedcountone2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletedcountother2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletetitleone2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_Deletetitleother2Inputs = {
    count: NonNullable<unknown>;
};
export type Recipients_EditInputs = {};
export type Recipients_Edittitle1Inputs = {};
export type Recipients_UpdatedInputs = {};
export type Recipients_Couldnotupdate2Inputs = {};
export type Recipients_Namerequired1Inputs = {};
export type Recipients_Emailmustcontainat3Inputs = {};
export type Logs_TitleInputs = {};
export type Logs_DescriptionInputs = {};
export type Logs_Filterbystatus2Inputs = {};
export type Logs_Allstatuses1Inputs = {};
export type Logs_FromInputs = {};
export type Logs_ToInputs = {};
export type Logs_Jobscreatedfrom2Inputs = {};
export type Logs_Jobscreatedupto3Inputs = {};
export type Logs_Couldnotload2Inputs = {};
export type Logs_Loadinglogs1Inputs = {};
export type Logs_Nojobsmatchfilters3Inputs = {};
export type Logs_Nojobshint2Inputs = {};
export type Logs_Nosendjobsyet3Inputs = {};
export type Logs_Nosendjobshint3Inputs = {};
export type Logs_StatusInputs = {};
export type Logs_SubjectInputs = {};
export type Logs_TemplateInputs = {};
export type Logs_Sentfailedskipped2Inputs = {};
export type Logs_StartedInputs = {};
export type Logs_DurationInputs = {};
export type Logs_Pausedprogress1Inputs = {
    sent: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Logs_ResumingInputs = {};
export type Jobdetail_Alllogs2Inputs = {};
export type Jobdetail_Jobdetail2Inputs = {};
export type Jobdetail_Counts1Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    skipped: NonNullable<unknown>;
};
export type Jobdetail_Resume1Inputs = {};
export type Jobdetail_Retryallfailures3Inputs = {
    count: NonNullable<unknown>;
};
export type Jobdetail_Template1Inputs = {};
export type Jobdetail_Smtp1Inputs = {};
export type Jobdetail_Sender1Inputs = {};
export type Jobdetail_Startedduration2Inputs = {};
export type Jobdetail_Deletedprofile2Inputs = {};
export type Jobdetail_Inline1Inputs = {};
export type Jobdetail_Recipient1Inputs = {};
export type Jobdetail_Noemailaddress3Inputs = {};
export type Jobdetail_Error1Inputs = {};
export type Jobdetail_Sentat2Inputs = {};
export type Jobdetail_Messageid2Inputs = {};
export type Jobdetail_Retry1Inputs = {};
export type Jobdetail_Searchplaceholder2Inputs = {};
export type Jobdetail_Searcharia2Inputs = {};
export type Jobdetail_Filterbystatus3Inputs = {};
export type Jobdetail_Loadingjob2Inputs = {};
export type Jobdetail_Couldnotload3Inputs = {};
export type Jobdetail_Jobnotfound3Inputs = {};
export type Jobdetail_Jobnotfoundhint4Inputs = {};
export type Jobdetail_Backtologs3Inputs = {};
export type Jobdetail_Nomatchsearch3Inputs = {};
export type Jobdetail_Nomatchhint3Inputs = {};
export type Jobdetail_Status1Inputs = {};
export type Jobdetail_Fixemail2Inputs = {};
export type Jobdetail_Fixemailtitle3Inputs = {};
export type Jobdetail_Recipientdeletednoedit4Inputs = {};
export type Jobdetail_Emailfixedretrying3Inputs = {};
export type Jobdetail_Couldnotfixemail4Inputs = {};
export type Send_TitleInputs = {};
export type Send_DescriptionInputs = {};
export type Send_Recipientsource1Inputs = {};
export type Send_Sourcefromjob2Inputs = {};
export type Send_Sourcefromjobhint3Inputs = {};
export type Send_Sourcefromlist2Inputs = {};
export type Send_Sourcefromlisthint3Inputs = {};
export type Send_Choosejob1Inputs = {};
export type Send_Nogeneratejobsyet3Inputs = {};
export type Send_Nogeneratejobshint3Inputs = {};
export type Send_Joboption1Inputs = {
    template: NonNullable<unknown>;
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
export type Send_Couldnotloadjobs3Inputs = {};
export type Send_Couldnotloadjob3Inputs = {};
export type Send_Jobrecipients1Inputs = {};
export type Send_Jobrecipientshint2Inputs = {};
export type Send_Filterall1Inputs = {};
export type Send_Filterwithattachment2Inputs = {};
export type Send_Filterwithoutattachment2Inputs = {};
export type Send_Attachmentfilteraria2Inputs = {};
export type Send_Generatestatus1Inputs = {};
export type Send_AttachmentInputs = {};
export type Send_Rowhasattachment2Inputs = {};
export type Send_Rownoattachment2Inputs = {};
export type Send_Failedgeneratetitle2Inputs = {};
export type Send_Norecipientsinjob3Inputs = {};
export type Send_Preflighthint1Inputs = {};
export type Send_Attachmentssummary1Inputs = {
    with: NonNullable<unknown>;
    without: NonNullable<unknown>;
};
export type Send_Sendthese1Inputs = {};
export type Send_Prefillretryone2Inputs = {
    count: NonNullable<unknown>;
};
export type Send_Prefillretryother2Inputs = {
    count: NonNullable<unknown>;
};
export type Send_Prefillreenterpassword2Inputs = {};
export type Send_Prefilldeletedone2Inputs = {
    count: NonNullable<unknown>;
};
export type Send_Prefilldeletedother2Inputs = {
    count: NonNullable<unknown>;
};
export type Sendjob_Selectrecipients2Inputs = {};
export type Sendjob_Writesubject2Inputs = {};
export type Sendjob_Writebody2Inputs = {};
export type Sendjob_Entersender2Inputs = {};
export type Sendjob_Chooseoneidentity3Inputs = {};
export type Sendjob_Norecipientsexist3Inputs = {};
export type Sendjob_Alreadysending2Inputs = {};
export type Sendjob_Anothersendactive3Inputs = {};
export type Sendjob_Stillpausing2Inputs = {};
export type Sendjob_Onlysendingcanpause4Inputs = {};
export type Sendjob_Onlypausedcanresume4Inputs = {};
export type Sendjob_Finishedcannotcancel3Inputs = {};
export type Sendjob_Onlyfinishedcanretry4Inputs = {};
export type Sendjob_Nofailedrecipients3Inputs = {};
export type Sendjob_Attachmentsmissingondisk4Inputs = {};
export type Sendjob_Generatejobmissing3Inputs = {};
export type Sendjob_Recipientdeleted2Inputs = {};
export type Sendjob_Recipientnoemail3Inputs = {};
export type Sendjob_Noattachmentforrecipient4Inputs = {};
export type Sendjob_Retriesexhausted2Inputs = {
    message: NonNullable<unknown>;
};
export type Sendjob_Couldnotresumejob4Inputs = {};
export type Sendjob_Quitinprogress3Inputs = {
    sent: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Sendjob_Quitandpause3Inputs = {};
export type Sendjob_Keepsending2Inputs = {};
export type Sendjob_Launchbanner2Inputs = {
    subject: NonNullable<unknown>;
    sent: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
export type Sendjob_Credentialunreadable2Inputs = {};
export type Generatejob_Templatemissing2Inputs = {};
export type Generatejob_Templatefilemissing3Inputs = {
    path: NonNullable<unknown>;
};
export type Generatejob_Libreofficemissing3Inputs = {};
export type Generatejob_Recipientdeleted2Inputs = {};
export type Generatejob_Missingslotdata3Inputs = {
    slot: NonNullable<unknown>;
};
export type Generatejob_Couldnotfill3Inputs = {
    message: NonNullable<unknown>;
};
export type Generatejob_Nopdfproduced3Inputs = {};
export type Generatejob_Selectrecipients2Inputs = {};
export type Generatejob_Norecipientsexist3Inputs = {};
export type Generatejob_Jobcouldnotbecreated5Inputs = {};
export type Generatejob_Nofreefilename4Inputs = {
    name: NonNullable<unknown>;
};
export type Generatejob_Unassignedtemplatevalues3Inputs = {
    count: NonNullable<unknown>;
    names: NonNullable<unknown>;
};
export type Generatejob_Unassignedtemplatevalue3Inputs = {
    value: NonNullable<unknown>;
};
export type Generatejob_Routingcolumnrequired3Inputs = {};
export type Templatesservice_Docxonly2Inputs = {};
export type Templatesservice_Couldnotread3Inputs = {
    path: NonNullable<unknown>;
    detail: NonNullable<unknown>;
};
export type Fontsservice_Invalidfontfile3Inputs = {};
export type Fontsservice_Couldnotread3Inputs = {
    path: NonNullable<unknown>;
};
export type Importservice_Nonamecolumn3Inputs = {};
export type Importservice_Noemailcolumn3Inputs = {};
export type Importservice_Notexcel2Inputs = {};
export type Importservice_Duplicateheaders2Inputs = {
    headers: NonNullable<unknown>;
};
export type Importservice_Rowsskippedemptyname4Inputs = {
    count: NonNullable<unknown>;
};
export type Validation_Smtpnamerequired2Inputs = {};
export type Validation_Smtphostrequired2Inputs = {};
export type Validation_Smtpportinvalid2Inputs = {};
export type Validation_Smtpusernamerequired2Inputs = {};
export type Validation_Smtppasswordrequired2Inputs = {};
export type Validation_Templatenamerequired2Inputs = {};
export type Validation_Templateneedsslot2Inputs = {};
export type Validation_Templatepatternneedsslot3Inputs = {
    name: NonNullable<unknown>;
};
export type Validation_Templatepatternunknownslot3Inputs = {
    slot: NonNullable<unknown>;
};
export type Validation_Messagetemplatenamerequired3Inputs = {};
export type Validation_Messagesubjectrequired2Inputs = {};
export type Validation_Messagebodyrequired2Inputs = {};
export type Validation_Slotlayoutinvalid2Inputs = {
    slot: NonNullable<unknown>;
};
export type Validation_Patternslotmissingintemplate4Inputs = {
    slot: NonNullable<unknown>;
    name: NonNullable<unknown>;
};
export type Dialogs_Excelfilter1Inputs = {};
export type Dialogs_Templatefilter1Inputs = {};
export type Dialogs_Pdffilter1Inputs = {};
export type Dialogs_Fontfilter1Inputs = {};
export type Messages_Documentstab1Inputs = {};
export type Messages_Messagestab1Inputs = {};
export type Messages_Addmessagetemplate2Inputs = {};
export type Messages_Countone1Inputs = {
    count: NonNullable<unknown>;
};
export type Messages_Countother1Inputs = {
    count: NonNullable<unknown>;
};
export type Messages_Notemplatesyet2Inputs = {};
export type Messages_Notemplateshint2Inputs = {};
export type Messages_Addtitle1Inputs = {};
export type Messages_Edittitle1Inputs = {
    name: NonNullable<unknown>;
};
export type Messages_EditInputs = {};
export type Messages_RegisteredInputs = {
    name: NonNullable<unknown>;
};
export type Messages_SavedInputs = {};
export type Messages_DeletedInputs = {};
export type Messages_Couldnotload2Inputs = {};
export type Messages_Couldnotsave2Inputs = {};
export type Messages_Couldnotdelete2Inputs = {};
export type Messages_Updatedstamp1Inputs = {
    stamp: NonNullable<unknown>;
};
export type Messages_Bodyhint1Inputs = {
    name: NonNullable<unknown>;
};
export type Messages_Norecipientshint2Inputs = {
    slot: NonNullable<unknown>;
};
export type Messages_Picklabel1Inputs = {};
export type Messages_Pickplaceholder1Inputs = {};
export type Messages_Saveas1Inputs = {};
export type Messages_Saveastitle2Inputs = {};
export type Messages_Saveasdescription2Inputs = {};
export type Messages_Saveascreated2Inputs = {
    name: NonNullable<unknown>;
};
export type Messages_Deletetitle1Inputs = {
    name: NonNullable<unknown>;
};
export type Messages_Deletedescription1Inputs = {};
export type Messages_Subjectdetail1Inputs = {};
export type Messages_Bodydetail1Inputs = {};
export type Messages_Nobodyyet2Inputs = {};
export type Messages_Copyonpickhint3Inputs = {};
export type Messages_Savetemplate1Inputs = {};
export type Messages_NameInputs = {};
export type Generate_TitleInputs = {};
export type Generate_DescriptionInputs = {};
export type Generate_Pastjobs1Inputs = {};
export type Generate_Pastjobsempty2Inputs = {};
export type Generate_Jobtemplate1Inputs = {};
export type Generate_Jobstatus1Inputs = {};
export type Generate_Jobcreated1Inputs = {};
export type Generate_Reopenjob1Inputs = {};
export type Generate_Reopenedtitle1Inputs = {};
export type Generate_Savepdf1Inputs = {};
export type Generate_Couldnotsavepdf3Inputs = {};
export type Generate_Couldnotloadjobs3Inputs = {};
export type Generate_Couldnotreopenjob3Inputs = {};
export type Generate_Jobnolongerexists3Inputs = {};
export type Generate_Startdisabledcoverage2Inputs = {};
export type Generate_Retryjobhint2Inputs = {};
export type Generate_Prefilldeletedone2Inputs = {
    count: NonNullable<unknown>;
};
export type Generate_Prefilldeletedother2Inputs = {
    count: NonNullable<unknown>;
};
export type Generate_Routingtitle1Inputs = {};
export type Generate_Routinghint1Inputs = {};
export type Generate_Routingcolumnlabel2Inputs = {};
export type Generate_Routingcolumnnone2Inputs = {};
export type Generate_Routingcolumnsuggested2Inputs = {
    column: NonNullable<unknown>;
};
export type Generate_Defaulttemplatelabel2Inputs = {};
export type Generate_Defaulttemplatehint2Inputs = {
    column: NonNullable<unknown>;
};
export type Generate_Assignmenttitle1Inputs = {};
export type Generate_Assignmenthint1Inputs = {};
export type Generate_Assignedto1Inputs = {
    value: NonNullable<unknown>;
};
export type Generate_Valuecountone2Inputs = {
    count: NonNullable<unknown>;
};
export type Generate_Valuecountother2Inputs = {
    count: NonNullable<unknown>;
};
export type Generate_Unassignedsummary1Inputs = {
    count: NonNullable<unknown>;
};
export type Generate_Unassignedvalueone2Inputs = {
    value: NonNullable<unknown>;
    count: NonNullable<unknown>;
    names: NonNullable<unknown>;
};
export type Generate_Unassignedvalueother2Inputs = {
    value: NonNullable<unknown>;
    count: NonNullable<unknown>;
    names: NonNullable<unknown>;
};
export type Generate_Allvaluesassigned2Inputs = {};
export type Generate_Patternlabel1Inputs = {};
export type Generate_Patternhint1Inputs = {};
export type Generate_Jobpatternplaceholder2Inputs = {
    name: NonNullable<unknown>;
};
export type Generate_Templatecoverageok2Inputs = {
    count: NonNullable<unknown>;
};
export type Generate_Templatecoveragemissing2Inputs = {
    missing: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
export type Generate_Startdisabledrouting2Inputs = {};
export type Generate_Startdisabledpattern2Inputs = {};
export type Generate_Allblankvalues2Inputs = {
    column: NonNullable<unknown>;
};
export type Generate_Unassignedsummaryone2Inputs = {
    count: NonNullable<unknown>;
};
export type Update_TitleInputs = {};
export type Update_Checknow1Inputs = {};
export type Update_CheckingInputs = {};
export type Update_Checkfailed1Inputs = {};
export type Update_Uptodate2Inputs = {};
export type Update_AvailableInputs = {
    version: NonNullable<unknown>;
};
export type Update_DownloadingInputs = {
    version: NonNullable<unknown>;
    progress: NonNullable<unknown>;
};
export type Update_ReadyInputs = {
    version: NonNullable<unknown>;
};
export type Update_DownloadInputs = {};
export type Update_Openreleasepage2Inputs = {};
export type Update_Replacemanually1Inputs = {};
export type Update_Restartandinstall2Inputs = {};
export type Update_Updatedto1Inputs = {
    version: NonNullable<unknown>;
};
export type Update_UnsupportedInputs = {};
export type Update_Errorcheck1Inputs = {
    message: NonNullable<unknown>;
};
export type Update_Errordownload1Inputs = {
    message: NonNullable<unknown>;
};
export type Update_Erroractivejob2Inputs = {};

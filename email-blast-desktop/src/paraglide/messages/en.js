/* eslint-disable */
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
/** @typedef {{}} Nav_ImportInputs */
/** @typedef {{}} Nav_RecipientsInputs */
/** @typedef {{}} Nav_TemplatesInputs */
/** @typedef {{}} Nav_ComposeInputs */
/** @typedef {{}} Nav_LogsInputs */
/** @typedef {{}} Nav_SettingsInputs */
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
/** @typedef {{}} Smtp_Saveprofile1Inputs */
/** @typedef {{}} Smtp_Savechanges1Inputs */
/** @typedef {{ name: NonNullable<unknown> }} Smtp_Deleteprofiletitle2Inputs */
/** @typedef {{}} Smtp_Deleteprofiledescription2Inputs */
/** @typedef {{}} Smtp_Passwordlabel1Inputs */
/** @typedef {{}} Compose_TitleInputs */
/** @typedef {{}} Compose_DescriptionInputs */
/** @typedef {{}} Compose_Steprecipients1Inputs */
/** @typedef {{}} Compose_Steptemplate1Inputs */
/** @typedef {{}} Compose_Stepmessage1Inputs */
/** @typedef {{}} Compose_Stepsmtp1Inputs */
/** @typedef {{}} Compose_Stepgenerate1Inputs */
/** @typedef {{}} Compose_Stepsend1Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Datacoversallslots3Inputs */
/** @typedef {{ slot: NonNullable<unknown> }} Compose_Unknownslotfooter2Inputs */
/** @typedef {{}} Compose_Writesubjecttocontinue3Inputs */
/** @typedef {{}} Compose_Writebodytocontinue3Inputs */
/** @typedef {{}} Compose_Messagelooksgood2Inputs */
/** @typedef {{}} Compose_Connectiondetailsready2Inputs */
/** @typedef {{}} Compose_Completesmtpdetails2Inputs */
/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedfailedfooter2Inputs */
/** @typedef {{}} Compose_Prefillreenterpassword2Inputs */
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
/** @typedef {{ count: NonNullable<unknown> }} Compose_Generatedpdfscount2Inputs */
/** @typedef {{}} Compose_Preflighthint1Inputs */
/** @typedef {{}} Compose_Nogeneratedattachments2Inputs */
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
/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefillretryone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefillretryother2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefilldeletedone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefilldeletedother2Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountone3Inputs */
/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountother3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleone3Inputs */
/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintone3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintother3Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountone2Inputs */
/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountother2Inputs */
/** @typedef {{}} Compose_Apppasswordplaceholder2Inputs */
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
/** @typedef {{}} Importpage_Title1Inputs */
/** @typedef {{}} Importpage_Description1Inputs */
/** @typedef {{}} Importpage_Importanotherfile3Inputs */
/** @typedef {{}} Importpage_Dragdrophint3Inputs */
/** @typedef {{}} Importpage_Fileformathint3Inputs */
/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Parsing1Inputs */
/** @typedef {{}} Importpage_Importcomplete2Inputs */
/** @typedef {{}} Importpage_Gotocompose3Inputs */
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
/** @typedef {{}} Sendjob_Noconfirmedattachments3Inputs */
/** @typedef {{}} Sendjob_Attachmentsmissingondisk4Inputs */
/** @typedef {{}} Sendjob_Recipientdeleted2Inputs */
/** @typedef {{}} Sendjob_Recipientnoemail3Inputs */
/** @typedef {{}} Sendjob_Noattachmentforrecipient4Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Sendjob_Retriesexhausted2Inputs */
/** @typedef {{}} Sendjob_Couldnotresumejob4Inputs */
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
/** @typedef {{}} Templatesservice_Docxonly2Inputs */
/** @typedef {{ path: NonNullable<unknown>, detail: NonNullable<unknown> }} Templatesservice_Couldnotread3Inputs */
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
/** @typedef {{}} Dialogs_Excelfilter1Inputs */
/** @typedef {{}} Dialogs_Templatefilter1Inputs */


export const common_back = /** @type {(inputs: Common_BackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back`)
};

export const common_next = /** @type {(inputs: Common_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

export const common_cancel = /** @type {(inputs: Common_CancelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel`)
};

export const common_save = /** @type {(inputs: Common_SaveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save`)
};

export const common_delete = /** @type {(inputs: Common_DeleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete`)
};

export const common_retry = /** @type {(inputs: Common_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry`)
};

export const common_resume = /** @type {(inputs: Common_ResumeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resume`)
};

export const common_pause = /** @type {(inputs: Common_PauseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pause`)
};

export const common_prev = /** @type {(inputs: Common_PrevInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prev`)
};

export const common_clear = /** @type {(inputs: Common_ClearInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear`)
};

export const common_dismiss = /** @type {(inputs: Common_DismissInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

export const common_browse = /** @type {(inputs: Common_BrowseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browse…`)
};

export const common_loading = /** @type {(inputs: Common_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading…`)
};

export const common_saved = /** @type {(inputs: Common_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved`)
};

export const common_saving = /** @type {(inputs: Common_SavingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving…`)
};

export const common_deleting = /** @type {(inputs: Common_DeletingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deleting…`)
};

export const common_testing = /** @type {(inputs: Common_TestingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testing…`)
};

export const common_closedetails1 = /** @type {(inputs: Common_Closedetails1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close details`)
};

export const common_couldnotload2 = /** @type {(inputs: Common_Couldnotload2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not load ${i?.key}.`)
};

export const common_couldnotsave2 = /** @type {(inputs: Common_Couldnotsave2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not save ${i?.key}.`)
};

export const common_retryfailures1 = /** @type {(inputs: Common_Retryfailures1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry Failures`)
};

export const nav_import = /** @type {(inputs: Nav_ImportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import`)
};

export const nav_recipients = /** @type {(inputs: Nav_RecipientsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients`)
};

export const nav_templates = /** @type {(inputs: Nav_TemplatesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates`)
};

export const nav_compose = /** @type {(inputs: Nav_ComposeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compose`)
};

export const nav_logs = /** @type {(inputs: Nav_LogsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logs`)
};

export const nav_settings = /** @type {(inputs: Nav_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

export const app_backendunreachable1 = /** @type {(inputs: App_Backendunreachable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not reach the app backend. The database may not be ready yet.`)
};

export const welcome_title = /** @type {(inputs: Welcome_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Welcome to Email Blast`)
};

export const welcome_subtitle = /** @type {(inputs: Welcome_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One last check before you start sending.`)
};

export const welcome_checkinglibreoffice2 = /** @type {(inputs: Welcome_Checkinglibreoffice2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Checking for LibreOffice...`)
};

export const welcome_libreofficepurpose2 = /** @type {(inputs: Welcome_Libreofficepurpose2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Used to convert letters to PDF`)
};

export const welcome_libreofficefound2 = /** @type {(inputs: Welcome_Libreofficefound2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice found`)
};

export const welcome_libreofficemissing2 = /** @type {(inputs: Welcome_Libreofficemissing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice is not installed`)
};

export const welcome_libreofficemissingdetail3 = /** @type {(inputs: Welcome_Libreofficemissingdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email Blast uses LibreOffice to convert filled letters to PDF.`)
};

export const welcome_installwith1 = /** @type {(inputs: Welcome_Installwith1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install it with`)
};

export const welcome_downloadfrom1 = /** @type {(inputs: Welcome_Downloadfrom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download it from`)
};

export const welcome_checkagain1 = /** @type {(inputs: Welcome_Checkagain1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Check Again`)
};

export const welcome_templatesfolder1 = /** @type {(inputs: Welcome_Templatesfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates folder`)
};

export const welcome_outputfolder1 = /** @type {(inputs: Welcome_Outputfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output folder`)
};

export const welcome_settingup1 = /** @type {(inputs: Welcome_Settingup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setting up…`)
};

export const welcome_getstarted1 = /** @type {(inputs: Welcome_Getstarted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Get Started`)
};

export const status_pending = /** @type {(inputs: Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending`)
};

export const status_sending = /** @type {(inputs: Status_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending`)
};

export const status_paused = /** @type {(inputs: Status_PausedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paused`)
};

export const status_completed = /** @type {(inputs: Status_CompletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Completed`)
};

export const status_cancelled = /** @type {(inputs: Status_CancelledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancelled`)
};

export const status_failed = /** @type {(inputs: Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

export const status_skipped = /** @type {(inputs: Status_SkippedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skipped`)
};

export const status_sent = /** @type {(inputs: Status_SentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sent`)
};

export const settingspage_title1 = /** @type {(inputs: Settingspage_Title1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

export const settingspage_description1 = /** @type {(inputs: Settingspage_Description1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP profiles, sending rate, default folders, and app information.`)
};

export const settingspage_ratelimiting2 = /** @type {(inputs: Settingspage_Ratelimiting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rate limiting`)
};

export const settingspage_ratelimitingdescription3 = /** @type {(inputs: Settingspage_Ratelimitingdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The delay between each email while a send job runs.`)
};

export const settingspage_msperemail3 = /** @type {(inputs: Settingspage_Msperemail3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ms} ms per email`)
};

export const settingspage_delaybetweenemails3 = /** @type {(inputs: Settingspage_Delaybetweenemails3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delay between emails`)
};

export const settingspage_defaultfolders2 = /** @type {(inputs: Settingspage_Defaultfolders2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default folders`)
};

export const settingspage_defaultfoldersdescription3 = /** @type {(inputs: Settingspage_Defaultfoldersdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Where templates live and where generated PDFs are written. The app creates them when missing.`)
};

export const settingspage_templatesfolder2 = /** @type {(inputs: Settingspage_Templatesfolder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates folder`)
};

export const settingspage_outputfolder2 = /** @type {(inputs: Settingspage_Outputfolder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output folder`)
};

export const settingspage_about1 = /** @type {(inputs: Settingspage_About1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`About`)
};

export const settingspage_app1 = /** @type {(inputs: Settingspage_App1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App`)
};

export const settingspage_version1 = /** @type {(inputs: Settingspage_Version1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Version`)
};

export const settingspage_data1 = /** @type {(inputs: Settingspage_Data1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Data`)
};

export const settingspage_storedlocally2 = /** @type {(inputs: Settingspage_Storedlocally2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stored locally on this machine`)
};

export const settingspage_language1 = /** @type {(inputs: Settingspage_Language1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Language`)
};

export const settingspage_languagedescription2 = /** @type {(inputs: Settingspage_Languagedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The language the app interface is shown in.`)
};

export const settingspage_ratepersecondone4 = /** @type {(inputs: Settingspage_Ratepersecondone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.rate} email per second`)
};

export const settingspage_ratepersecondother4 = /** @type {(inputs: Settingspage_Ratepersecondother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.rate} emails per second`)
};

export const settingspage_couldnotload3 = /** @type {(inputs: Settingspage_Couldnotload3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load settings.`)
};

export const smtp_title = /** @type {(inputs: Smtp_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP profiles`)
};

export const smtp_description = /** @type {(inputs: Smtp_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved sender identities the compose wizard can pick from. Passwords are stored locally and never shown.`)
};

export const smtp_addprofile1 = /** @type {(inputs: Smtp_Addprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add profile`)
};

export const smtp_profilesaved1 = /** @type {(inputs: Smtp_Profilesaved1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Profile "${i?.name}" saved.`)
};

export const smtp_profiledeleted1 = /** @type {(inputs: Smtp_Profiledeleted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile deleted.`)
};

export const smtp_couldnotsaveprofile3 = /** @type {(inputs: Smtp_Couldnotsaveprofile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not save the profile.`)
};

export const smtp_couldnotdeleteprofile3 = /** @type {(inputs: Smtp_Couldnotdeleteprofile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not delete the profile.`)
};

export const smtp_couldnotloadprofiles3 = /** @type {(inputs: Smtp_Couldnotloadprofiles3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load SMTP profiles.`)
};

export const smtp_loadingprofiles1 = /** @type {(inputs: Smtp_Loadingprofiles1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading profiles…`)
};

export const smtp_noprofilesyet2 = /** @type {(inputs: Smtp_Noprofilesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No SMTP profiles yet`)
};

export const smtp_noprofilesdescription2 = /** @type {(inputs: Smtp_Noprofilesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save your SMTP server details once (e.g. Gmail with an app password) and reuse them for every campaign.`)
};

export const smtp_testconnection1 = /** @type {(inputs: Smtp_Testconnection1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test connection`)
};

export const smtp_connectionok1 = /** @type {(inputs: Smtp_Connectionok1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection OK - the server accepted the credentials.`)
};

export const smtp_connected = /** @type {(inputs: Smtp_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connected - the server accepted these credentials.`)
};

export const smtp_connectionfailed1 = /** @type {(inputs: Smtp_Connectionfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection failed.`)
};

export const smtp_passwordnotset2 = /** @type {(inputs: Smtp_Passwordnotset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`not set`)
};

export const smtp_addprofiletitle2 = /** @type {(inputs: Smtp_Addprofiletitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add SMTP profile`)
};

export const smtp_editprofiletitle2 = /** @type {(inputs: Smtp_Editprofiletitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit "${i?.name}"`)
};

export const smtp_createhint1 = /** @type {(inputs: Smtp_Createhint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save your SMTP server details to reuse in every campaign.`)
};

export const smtp_edithint1 = /** @type {(inputs: Smtp_Edithint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The stored password is never shown; leave the field blank to keep it.`)
};

export const smtp_profilename1 = /** @type {(inputs: Smtp_Profilename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile name`)
};

export const smtp_smtphost1 = /** @type {(inputs: Smtp_Smtphost1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP host`)
};

export const smtp_port = /** @type {(inputs: Smtp_PortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port`)
};

export const smtp_implicittls1 = /** @type {(inputs: Smtp_Implicittls1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Implicit TLS`)
};

export const smtp_starttls = /** @type {(inputs: Smtp_StarttlsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`STARTTLS`)
};

export const smtp_username = /** @type {(inputs: Smtp_UsernameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username`)
};

export const smtp_apppassword1 = /** @type {(inputs: Smtp_Apppassword1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App password`)
};

export const smtp_leaveblanktokeep3 = /** @type {(inputs: Smtp_Leaveblanktokeep3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leave blank to keep the current one`)
};

export const smtp_gmailapppasswordhint3 = /** @type {(inputs: Smtp_Gmailapppasswordhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gmail: generate a 16-character app password with 2-step verification enabled.`)
};

export const smtp_saveprofile1 = /** @type {(inputs: Smtp_Saveprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save profile`)
};

export const smtp_savechanges1 = /** @type {(inputs: Smtp_Savechanges1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save changes`)
};

export const smtp_deleteprofiletitle2 = /** @type {(inputs: Smtp_Deleteprofiletitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete "${i?.name}"?`)
};

export const smtp_deleteprofiledescription2 = /** @type {(inputs: Smtp_Deleteprofiledescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The profile and its stored password are removed from the app.`)
};

export const smtp_passwordlabel1 = /** @type {(inputs: Smtp_Passwordlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`password`)
};

export const compose_title = /** @type {(inputs: Compose_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compose`)
};

export const compose_description = /** @type {(inputs: Compose_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick who receives the documents, write the message, and send the emails.`)
};

export const compose_steprecipients1 = /** @type {(inputs: Compose_Steprecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients`)
};

export const compose_steptemplate1 = /** @type {(inputs: Compose_Steptemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

export const compose_stepmessage1 = /** @type {(inputs: Compose_Stepmessage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message`)
};

export const compose_stepsmtp1 = /** @type {(inputs: Compose_Stepsmtp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP`)
};

export const compose_stepgenerate1 = /** @type {(inputs: Compose_Stepgenerate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate & Review`)
};

export const compose_stepsend1 = /** @type {(inputs: Compose_Stepsend1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send`)
};

export const compose_datacoversallslots3 = /** @type {(inputs: Compose_Datacoversallslots3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients, data covers all slots`)
};

export const compose_unknownslotfooter2 = /** @type {(inputs: Compose_Unknownslotfooter2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unknown slot: ${i?.slot}`)
};

export const compose_writesubjecttocontinue3 = /** @type {(inputs: Compose_Writesubjecttocontinue3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write a subject to continue`)
};

export const compose_writebodytocontinue3 = /** @type {(inputs: Compose_Writebodytocontinue3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write an email body to continue`)
};

export const compose_messagelooksgood2 = /** @type {(inputs: Compose_Messagelooksgood2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message looks good`)
};

export const compose_connectiondetailsready2 = /** @type {(inputs: Compose_Connectiondetailsready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection details ready`)
};

export const compose_completesmtpdetails2 = /** @type {(inputs: Compose_Completesmtpdetails2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Complete the SMTP and sender details`)
};

export const compose_generatedfailedfooter2 = /** @type {(inputs: Compose_Generatedfailedfooter2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} generated, ${i?.failed} failed`)
};

export const compose_prefillreenterpassword2 = /** @type {(inputs: Compose_Prefillreenterpassword2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Re-enter the app password to send again - passwords never leave this app.`)
};

export const compose_searchrecipients1 = /** @type {(inputs: Compose_Searchrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipients`)
};

export const compose_searchplaceholder1 = /** @type {(inputs: Compose_Searchplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search name, email, or any field…`)
};

export const compose_filterbybatch2 = /** @type {(inputs: Compose_Filterbybatch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter by import batch`)
};

export const compose_allbatches1 = /** @type {(inputs: Compose_Allbatches1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All batches`)
};

export const compose_batchoption1 = /** @type {(inputs: Compose_Batchoption1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients · ${i?.stamp}`)
};

export const compose_selectallmatchingtitle3 = /** @type {(inputs: Compose_Selectallmatchingtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select all ${i?.total} recipients matching the current filter`)
};

export const compose_selectallcount2 = /** @type {(inputs: Compose_Selectallcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select all ${i?.total}`)
};

export const compose_couldnotloadrecipients3 = /** @type {(inputs: Compose_Couldnotloadrecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load recipients.`)
};

export const compose_norecipientsyet2 = /** @type {(inputs: Compose_Norecipientsyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients yet`)
};

export const compose_norecipientsmatchfilter3 = /** @type {(inputs: Compose_Norecipientsmatchfilter3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients match this filter`)
};

export const compose_norecipientshint2 = /** @type {(inputs: Compose_Norecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import an Excel file first, then come back here to build a campaign.`)
};

export const compose_gotoimport2 = /** @type {(inputs: Compose_Gotoimport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Import`)
};

export const compose_trydifferentfilter2 = /** @type {(inputs: Compose_Trydifferentfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try a different search or batch filter.`)
};

export const compose_selectallonpage3 = /** @type {(inputs: Compose_Selectallonpage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select all on this page`)
};

export const compose_name = /** @type {(inputs: Compose_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Name`)
};

export const compose_email = /** @type {(inputs: Compose_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

export const compose_phone = /** @type {(inputs: Compose_PhoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Phone`)
};

export const compose_selectrecipient1 = /** @type {(inputs: Compose_Selectrecipient1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select ${i?.name}`)
};

export const compose_selectioncount1 = /** @type {(inputs: Compose_Selectioncount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.selected} selected · ${i?.total} matching`)
};

export const compose_pageof1 = /** @type {(inputs: Compose_Pageof1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Page ${i?.page} of ${i?.total}`)
};

export const compose_templatelabel1 = /** @type {(inputs: Compose_Templatelabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Letter or certificate template`)
};

export const compose_choosetemplate1 = /** @type {(inputs: Compose_Choosetemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a template…`)
};

export const compose_notemplatesregistered2 = /** @type {(inputs: Compose_Notemplatesregistered2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No templates registered yet.`)
};

export const compose_registertemplatelink2 = /** @type {(inputs: Compose_Registertemplatelink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Register a template`)
};

export const compose_notemplatesregisteredhint3 = /** @type {(inputs: Compose_Notemplatesregisteredhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`first, then come back.`)
};

export const compose_requiredslots1 = /** @type {(inputs: Compose_Requiredslots1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Required slots`)
};

export const compose_outputpattern1 = /** @type {(inputs: Compose_Outputpattern1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output pattern`)
};

export const compose_allcovered1 = /** @type {(inputs: Compose_Allcovered1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All ${i?.count} selected recipients have data for every required slot.`)
};

export const compose_missingdatasummary2 = /** @type {(inputs: Compose_Missingdatasummary2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.missing} of ${i?.count} selected recipients are missing data for:`)
};

export const compose_missingdatahint2 = /** @type {(inputs: Compose_Missingdatahint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fix the recipients' data or pick another template before continuing - missing slots produce broken PDFs.`)
};

export const compose_subject = /** @type {(inputs: Compose_SubjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subject`)
};

export const compose_subjectplaceholder1 = /** @type {(inputs: Compose_Subjectplaceholder1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`LOA for ${i?.name} - ${i?.instansi}`)
};

export const compose_bodylabel1 = /** @type {(inputs: Compose_Bodylabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTML body - type { to insert a recipient field`)
};

export const compose_bodyplaceholder1 = /** @type {(inputs: Compose_Bodyplaceholder1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`<p>Dear ${i?.name},</p>
<p>Congratulations on your scholarship.</p>`)
};

export const compose_unknownslothint2 = /** @type {(inputs: Compose_Unknownslothint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No selected recipient has this field. Fix the placeholder or the recipients' data - sending would fail for everyone.`)
};

export const compose_missingslottitle2 = /** @type {(inputs: Compose_Missingslottitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Some recipients are missing data for: ${i?.list}`)
};

export const compose_missingslothint2 = /** @type {(inputs: Compose_Missingslothint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Those recipients will fail at send time while the rest of the batch continues. Fix their data to avoid failures.`)
};

export const compose_livepreview1 = /** @type {(inputs: Compose_Livepreview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live preview`)
};

export const compose_previewfor1 = /** @type {(inputs: Compose_Previewfor1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Preview for ${i?.name}`)
};

export const compose_emailconnection1 = /** @type {(inputs: Compose_Emailconnection1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email connection`)
};

export const compose_savedprofile1 = /** @type {(inputs: Compose_Savedprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved profile`)
};

export const compose_enterdetails1 = /** @type {(inputs: Compose_Enterdetails1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter details (this job only)`)
};

export const compose_chooseprofile1 = /** @type {(inputs: Compose_Chooseprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a profile…`)
};

export const compose_nosavedprofileshint3 = /** @type {(inputs: Compose_Nosavedprofileshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No saved profiles yet - switch to "Enter details" and use "Save as profile", or add one in`)
};

export const compose_settingslink1 = /** @type {(inputs: Compose_Settingslink1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

export const compose_host = /** @type {(inputs: Compose_HostInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Host`)
};

export const compose_portlabel1 = /** @type {(inputs: Compose_Portlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port (465 = implicit TLS, else STARTTLS)`)
};

export const compose_usernamelabel1 = /** @type {(inputs: Compose_Usernamelabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username (email address)`)
};

export const compose_apppasswordlabel2 = /** @type {(inputs: Compose_Apppasswordlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App password`)
};

export const compose_saveasprofile2 = /** @type {(inputs: Compose_Saveasprofile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save as profile`)
};

export const compose_profilenameplaceholder2 = /** @type {(inputs: Compose_Profilenameplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile name, e.g. Gmail utama`)
};

export const compose_testconnectionbutton2 = /** @type {(inputs: Compose_Testconnectionbutton2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test Connection`)
};

export const compose_senderidentity1 = /** @type {(inputs: Compose_Senderidentity1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender identity`)
};

export const compose_sendername1 = /** @type {(inputs: Compose_Sendername1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender name`)
};

export const compose_senderaddress1 = /** @type {(inputs: Compose_Senderaddress1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender address`)
};

export const compose_sendingrate1 = /** @type {(inputs: Compose_Sendingrate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending rate`)
};

export const compose_sendingratems2 = /** @type {(inputs: Compose_Sendingratems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ms} ms / email`)
};

export const compose_sendingratehint2 = /** @type {(inputs: Compose_Sendingratehint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applies live - a running job picks up changes without restarting.`)
};

export const compose_generationfailed1 = /** @type {(inputs: Compose_Generationfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generation failed.`)
};

export const compose_connectionfailed1 = /** @type {(inputs: Compose_Connectionfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection failed.`)
};

export const compose_choosetemplatefirst2 = /** @type {(inputs: Compose_Choosetemplatefirst2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go back and choose a template first.`)
};

export const compose_campaignsummary1 = /** @type {(inputs: Compose_Campaignsummary1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Campaign summary`)
};

export const compose_recipients = /** @type {(inputs: Compose_RecipientsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients`)
};

export const compose_template = /** @type {(inputs: Compose_TemplateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

export const compose_outputfolder1 = /** @type {(inputs: Compose_Outputfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output folder`)
};

export const compose_campaignsummaryhint2 = /** @type {(inputs: Compose_Campaignsummaryhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One PDF per recipient, named by the template's output pattern. Failures are reported per recipient while the rest of the batch continues.`)
};

export const compose_generatepdfs1 = /** @type {(inputs: Compose_Generatepdfs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate PDFs`)
};

export const compose_generating = /** @type {(inputs: Compose_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating…`)
};

export const compose_oftotal1 = /** @type {(inputs: Compose_Oftotal1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.current} of ${i?.total}`)
};

export const compose_generatedcounts1 = /** @type {(inputs: Compose_Generatedcounts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} generated · ${i?.failed} failed · ${i?.pending} pending`)
};

export const compose_tryagain1 = /** @type {(inputs: Compose_Tryagain1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try again`)
};

export const compose_allgenerated1 = /** @type {(inputs: Compose_Allgenerated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All ${i?.count} PDFs generated.`)
};

export const compose_generatedwithfailures2 = /** @type {(inputs: Compose_Generatedwithfailures2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} generated, ${i?.failed} failed. Failed recipients are excluded from the send automatically.`)
};

export const compose_failedrecipientstitle2 = /** @type {(inputs: Compose_Failedrecipientstitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed recipients (${i?.count})`)
};

export const compose_spotcheck1 = /** @type {(inputs: Compose_Spotcheck1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spot-check`)
};

export const compose_spotindex1 = /** @type {(inputs: Compose_Spotindex1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.index} of ${i?.total}`)
};

export const compose_loadingpreview1 = /** @type {(inputs: Compose_Loadingpreview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading preview…`)
};

export const compose_sendsummary1 = /** @type {(inputs: Compose_Sendsummary1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send summary`)
};

export const compose_sender = /** @type {(inputs: Compose_SenderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender`)
};

export const compose_connection = /** @type {(inputs: Compose_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection`)
};

export const compose_pacing = /** @type {(inputs: Compose_PacingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pacing`)
};

export const compose_attachments = /** @type {(inputs: Compose_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Attachments`)
};

export const compose_generatedpdfscount2 = /** @type {(inputs: Compose_Generatedpdfscount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} generated PDFs`)
};

export const compose_preflighthint1 = /** @type {(inputs: Compose_Preflighthint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The pre-flight checks the SMTP connection and confirms the generated attachments before the first email goes out.`)
};

export const compose_nogeneratedattachments2 = /** @type {(inputs: Compose_Nogeneratedattachments2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients have a generated attachment - go back and generate the PDFs first.`)
};

export const compose_preparingsend1 = /** @type {(inputs: Compose_Preparingsend1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preparing the send…`)
};

export const compose_sending = /** @type {(inputs: Compose_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending…`)
};

export const compose_sendcounts1 = /** @type {(inputs: Compose_Sendcounts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent · ${i?.failed} failed · ${i?.pending} pending`)
};

export const compose_windingdowntitle2 = /** @type {(inputs: Compose_Windingdowntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The in-flight email is finishing - resume in a moment`)
};

export const compose_cancelsendconfirm2 = /** @type {(inputs: Compose_Cancelsendconfirm2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.current} of ${i?.total} sent - cancel anyway?`)
};

export const compose_perrecipientlog2 = /** @type {(inputs: Compose_Perrecipientlog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Per-recipient log`)
};

export const compose_waitingfirstemail2 = /** @type {(inputs: Compose_Waitingfirstemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Waiting for the first email…`)
};

export const compose_allemailssent2 = /** @type {(inputs: Compose_Allemailssent2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All ${i?.count} emails sent.`)
};

export const compose_sentwithfailures2 = /** @type {(inputs: Compose_Sentwithfailures2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent, ${i?.failed} failed. Retry the failures below.`)
};

export const compose_sendcancelled1 = /** @type {(inputs: Compose_Sendcancelled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send cancelled.`)
};

export const compose_cancelleddetail1 = /** @type {(inputs: Compose_Cancelleddetail1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent, ${i?.skipped} skipped. No one was double-sent. To send to the skipped recipients, go back and start a new send from the same generated PDFs.`)
};

export const compose_recipient = /** @type {(inputs: Compose_RecipientInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient`)
};

export const compose_rowskipped1 = /** @type {(inputs: Compose_Rowskipped1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (` - skipped`)
};

export const compose_sendingfailed1 = /** @type {(inputs: Compose_Sendingfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending failed.`)
};

export const compose_couldnotstartsend3 = /** @type {(inputs: Compose_Couldnotstartsend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not start the send.`)
};

export const compose_couldnotpausesend3 = /** @type {(inputs: Compose_Couldnotpausesend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not pause the send.`)
};

export const compose_couldnotcancelsend3 = /** @type {(inputs: Compose_Couldnotcancelsend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not cancel the send.`)
};

export const compose_couldnotretryfailures3 = /** @type {(inputs: Compose_Couldnotretryfailures3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not retry the failures.`)
};

export const compose_sendjobnolongerexists4 = /** @type {(inputs: Compose_Sendjobnolongerexists4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The send job no longer exists.`)
};

export const compose_couldnotresumesend3 = /** @type {(inputs: Compose_Couldnotresumesend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not resume the send.`)
};

export const compose_recipientsselectedone2 = /** @type {(inputs: Compose_Recipientsselectedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipient selected`)
};

export const compose_recipientsselectedother2 = /** @type {(inputs: Compose_Recipientsselectedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients selected`)
};

export const compose_prefillretryone2 = /** @type {(inputs: Compose_Prefillretryone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry pre-filled from Logs: ${i?.count} failed recipient, the same template, message, and SMTP.`)
};

export const compose_prefillretryother2 = /** @type {(inputs: Compose_Prefillretryother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry pre-filled from Logs: ${i?.count} failed recipients, the same template, message, and SMTP.`)
};

export const compose_prefilldeletedone2 = /** @type {(inputs: Compose_Prefilldeletedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} previously failed recipient was deleted.`)
};

export const compose_prefilldeletedother2 = /** @type {(inputs: Compose_Prefilldeletedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} previously failed recipients were deleted.`)
};

export const compose_slotmissingcountone3 = /** @type {(inputs: Compose_Slotmissingcountone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.slot} - ${i?.count} recipient`)
};

export const compose_slotmissingcountother3 = /** @type {(inputs: Compose_Slotmissingcountother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.slot} - ${i?.count} recipients`)
};

export const compose_unknownslottitleone3 = /** @type {(inputs: Compose_Unknownslottitleone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unknown slot: ${i?.list}`)
};

export const compose_unknownslottitleother3 = /** @type {(inputs: Compose_Unknownslottitleother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unknown slots: ${i?.list}`)
};

export const compose_livepreviewhintone3 = /** @type {(inputs: Compose_Livepreviewhintone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rendered for the first ${i?.count} selected recipient - the message updates as you type.`)
};

export const compose_livepreviewhintother3 = /** @type {(inputs: Compose_Livepreviewhintother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rendered for the first ${i?.count} selected recipients - the message updates as you type.`)
};

export const compose_sendcountone2 = /** @type {(inputs: Compose_Sendcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Send ${i?.count} email`)
};

export const compose_sendcountother2 = /** @type {(inputs: Compose_Sendcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Send ${i?.count} emails`)
};

export const compose_apppasswordplaceholder2 = /** @type {(inputs: Compose_Apppasswordplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`16-character app password`)
};

export const templates_title = /** @type {(inputs: Templates_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates`)
};

export const templates_addtemplate1 = /** @type {(inputs: Templates_Addtemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add template`)
};

export const templates_templateregistered1 = /** @type {(inputs: Templates_Templateregistered1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template "${i?.name}" registered.`)
};

export const templates_templatesaved1 = /** @type {(inputs: Templates_Templatesaved1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template "${i?.name}" saved.`)
};

export const templates_templatedeleted1 = /** @type {(inputs: Templates_Templatedeleted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template deleted.`)
};

export const templates_couldnotregister2 = /** @type {(inputs: Templates_Couldnotregister2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not register the template.`)
};

export const templates_couldnotsave2 = /** @type {(inputs: Templates_Couldnotsave2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not save the template.`)
};

export const templates_couldnotdelete2 = /** @type {(inputs: Templates_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not delete the template.`)
};

export const templates_couldnotload2 = /** @type {(inputs: Templates_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load templates.`)
};

export const templates_loadingtemplates1 = /** @type {(inputs: Templates_Loadingtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading templates…`)
};

export const templates_notemplatesyet2 = /** @type {(inputs: Templates_Notemplatesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No templates yet`)
};

export const templates_notemplateshint2 = /** @type {(inputs: Templates_Notemplateshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Register a DOCX letter template or an image certificate template to generate personalized documents.`)
};

export const templates_unsupportedfile1 = /** @type {(inputs: Templates_Unsupportedfile1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.fileName}" is not a supported template. Choose a .docx letter or a .png/.jpg/.jpeg certificate image.`)
};

export const templates_registered = /** @type {(inputs: Templates_RegisteredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registered`)
};

export const templates_slots = /** @type {(inputs: Templates_SlotsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slots`)
};

export const templates_noslotsdeclared2 = /** @type {(inputs: Templates_Noslotsdeclared2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No slots declared.`)
};

export const templates_outputpatternhint2 = /** @type {(inputs: Templates_Outputpatternhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated files are named with this pattern, one per recipient.`)
};

export const templates_editexternallyhint2 = /** @type {(inputs: Templates_Editexternallyhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit the template file itself in Word (DOCX) or Figma/Photoshop (images) - Email Blast fills it exactly as saved.`)
};

export const templates_edit = /** @type {(inputs: Templates_EditInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

export const templates_addtitle1 = /** @type {(inputs: Templates_Addtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add template`)
};

export const templates_edittitle1 = /** @type {(inputs: Templates_Edittitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit "${i?.name}"`)
};

export const templates_templatename1 = /** @type {(inputs: Templates_Templatename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template name`)
};

export const templates_scanning = /** @type {(inputs: Templates_ScanningInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Scanning…`)
};

export const templates_rescanfromfile2 = /** @type {(inputs: Templates_Rescanfromfile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rescan from file`)
};

export const templates_rescanconfirm1 = /** @type {(inputs: Templates_Rescanconfirm1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replace the slots below with the file's placeholders?`)
};

export const templates_replaceslots1 = /** @type {(inputs: Templates_Replaceslots1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replace slots`)
};

export const templates_keepmyslots2 = /** @type {(inputs: Templates_Keepmyslots2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keep my slots`)
};

export const templates_docxslotshint2 = /** @type {(inputs: Templates_Docxslotshint2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Detected from the ${i?.placeholders} in the document. Add, rename, or remove slots freely.`)
};

export const templates_imageslotshint2 = /** @type {(inputs: Templates_Imageslotshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter the slot names the certificate needs, e.g. nama, instansi.`)
};

export const templates_couldnotscan2 = /** @type {(inputs: Templates_Couldnotscan2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not scan the template for slots.`)
};

export const templates_slotscanbetyped3 = /** @type {(inputs: Templates_Slotscanbetyped3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slots can be typed below instead.`)
};

export const templates_slotaria1 = /** @type {(inputs: Templates_Slotaria1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot ${i?.index}`)
};

export const templates_removeslotaria2 = /** @type {(inputs: Templates_Removeslotaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Remove slot ${i?.index}`)
};

export const templates_addslot1 = /** @type {(inputs: Templates_Addslot1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add slot`)
};

export const templates_outputpatternfield2 = /** @type {(inputs: Templates_Outputpatternfield2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output pattern`)
};

export const templates_outputpatternplaceholder2 = /** @type {(inputs: Templates_Outputpatternplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`e.g. LOA_${i?.no}_${i?.name}.pdf`)
};

export const templates_registertemplate1 = /** @type {(inputs: Templates_Registertemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Register template`)
};

export const templates_savechanges1 = /** @type {(inputs: Templates_Savechanges1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save changes`)
};

export const templates_deletetitle1 = /** @type {(inputs: Templates_Deletetitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete "${i?.name}"?`)
};

export const templates_deletedescription1 = /** @type {(inputs: Templates_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The template is removed from the app. The file itself stays where it is.`)
};

export const templates_thistemplate1 = /** @type {(inputs: Templates_Thistemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`this template`)
};

export const templates_countregisteredone2 = /** @type {(inputs: Templates_Countregisteredone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} template registered`)
};

export const templates_countregisteredother2 = /** @type {(inputs: Templates_Countregisteredother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} templates registered`)
};

export const templates_slotcountone2 = /** @type {(inputs: Templates_Slotcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} slot · ${i?.stamp}`)
};

export const templates_slotcountother2 = /** @type {(inputs: Templates_Slotcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} slots · ${i?.stamp}`)
};

export const importpage_title1 = /** @type {(inputs: Importpage_Title1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import`)
};

export const importpage_description1 = /** @type {(inputs: Importpage_Description1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Load recipients from an Excel file, review the preview, and commit them to the database.`)
};

export const importpage_importanotherfile3 = /** @type {(inputs: Importpage_Importanotherfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import another file`)
};

export const importpage_dragdrophint3 = /** @type {(inputs: Importpage_Dragdrophint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Drag and drop an Excel file here`)
};

export const importpage_fileformathint3 = /** @type {(inputs: Importpage_Fileformathint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.xlsx or .xls, with the recipient list in the first sheet`)
};

export const importpage_parsing1 = /** @type {(inputs: Importpage_Parsing1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Parsing ${i?.fileName}…`)
};

export const importpage_importcomplete2 = /** @type {(inputs: Importpage_Importcomplete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import complete`)
};

export const importpage_gotocompose3 = /** @type {(inputs: Importpage_Gotocompose3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Compose`)
};

export const importpage_gotorecipients3 = /** @type {(inputs: Importpage_Gotorecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Recipients`)
};

export const importpage_couldnotread3 = /** @type {(inputs: Importpage_Couldnotread3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not read the file. It may not be a valid Excel file.`)
};

export const importpage_notexcelfile3 = /** @type {(inputs: Importpage_Notexcelfile3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.fileName}" is not an Excel file. Choose a .xlsx or .xls file.`)
};

export const importpage_couldnotcommit3 = /** @type {(inputs: Importpage_Couldnotcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not commit the import.`)
};

export const importpage_preview1 = /** @type {(inputs: Importpage_Preview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview`)
};

export const importpage_previewrows2 = /** @type {(inputs: Importpage_Previewrows2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.fileName} - showing ${i?.shown} of ${i?.total} rows`)
};

export const importpage_columnmapping2 = /** @type {(inputs: Importpage_Columnmapping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Column mapping`)
};

export const importpage_columnmappinghint3 = /** @type {(inputs: Importpage_Columnmappinghint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Match each Excel column to a recipient field. Name, email, and phone can each be used once; other columns become metadata available to template placeholders.`)
};

export const importpage_columnrolearia3 = /** @type {(inputs: Importpage_Columnrolearia3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Role of the "${i?.column}" column`)
};

export const importpage_resetmapping2 = /** @type {(inputs: Importpage_Resetmapping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset mapping`)
};

export const importpage_selectnamecolumn3 = /** @type {(inputs: Importpage_Selectnamecolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select a name column to import`)
};

export const importpage_importing1 = /** @type {(inputs: Importpage_Importing1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Importing…`)
};

export const importpage_importrecipients2 = /** @type {(inputs: Importpage_Importrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import recipients`)
};

export const importpage_nodatarows3 = /** @type {(inputs: Importpage_Nodatarows3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No data rows found in the first sheet.`)
};

export const importpage_rolename2 = /** @type {(inputs: Importpage_Rolename2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Name`)
};

export const importpage_roleemail2 = /** @type {(inputs: Importpage_Roleemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

export const importpage_rolephone2 = /** @type {(inputs: Importpage_Rolephone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Phone`)
};

export const importpage_rolemetadata2 = /** @type {(inputs: Importpage_Rolemetadata2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Metadata`)
};

export const importpage_roleskip2 = /** @type {(inputs: Importpage_Roleskip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skip`)
};

export const importpage_importcompletedetailone4 = /** @type {(inputs: Importpage_Importcompletedetailone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients from ${i?.fileName}. ${i?.duplicatesSkipped} duplicate skipped.`)
};

export const importpage_importcompletedetailother4 = /** @type {(inputs: Importpage_Importcompletedetailother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients from ${i?.fileName}. ${i?.duplicatesSkipped} duplicates skipped.`)
};

export const importpage_rowsskippednonameone5 = /** @type {(inputs: Importpage_Rowsskippednonameone5Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} row skipped: the name column was empty for it.`)
};

export const importpage_rowsskippednonameother5 = /** @type {(inputs: Importpage_Rowsskippednonameother5Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} rows skipped: the name column was empty for them.`)
};

export const importpage_importedtoastone3 = /** @type {(inputs: Importpage_Importedtoastone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients. ${i?.duplicatesSkipped} duplicate skipped.`)
};

export const importpage_importedtoastother3 = /** @type {(inputs: Importpage_Importedtoastother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients. ${i?.duplicatesSkipped} duplicates skipped.`)
};

export const importpage_duplicatesskippedparsingone4 = /** @type {(inputs: Importpage_Duplicatesskippedparsingone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} duplicate already skipped during parsing.`)
};

export const importpage_duplicatesskippedparsingother4 = /** @type {(inputs: Importpage_Duplicatesskippedparsingother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} duplicates already skipped during parsing.`)
};

export const recipients_title = /** @type {(inputs: Recipients_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients`)
};

export const recipients_couldnotdelete2 = /** @type {(inputs: Recipients_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not delete the selected recipients.`)
};

export const recipients_deleteselected1 = /** @type {(inputs: Recipients_Deleteselected1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete selected`)
};

export const recipients_deleteselectedcount2 = /** @type {(inputs: Recipients_Deleteselectedcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete selected (${i?.count})`)
};

export const recipients_searchplaceholder1 = /** @type {(inputs: Recipients_Searchplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search name, email, phone, or any field…`)
};

export const recipients_searcharia1 = /** @type {(inputs: Recipients_Searcharia1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipients`)
};

export const recipients_filterbybatch2 = /** @type {(inputs: Recipients_Filterbybatch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter by import batch`)
};

export const recipients_allbatches1 = /** @type {(inputs: Recipients_Allbatches1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All batches`)
};

export const recipients_couldnotload2 = /** @type {(inputs: Recipients_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load recipients.`)
};

export const recipients_loadingrecipients1 = /** @type {(inputs: Recipients_Loadingrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading recipients…`)
};

export const recipients_norecipientsyet2 = /** @type {(inputs: Recipients_Norecipientsyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients yet`)
};

export const recipients_norecipientshint2 = /** @type {(inputs: Recipients_Norecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import an Excel file to fill the directory.`)
};

export const recipients_gotoimport2 = /** @type {(inputs: Recipients_Gotoimport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Import`)
};

export const recipients_nomatchfilters2 = /** @type {(inputs: Recipients_Nomatchfilters2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients match your filters`)
};

export const recipients_nomatchhint2 = /** @type {(inputs: Recipients_Nomatchhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try a different search or batch.`)
};

export const recipients_clearfilters1 = /** @type {(inputs: Recipients_Clearfilters1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear filters`)
};

export const recipients_showingrange1 = /** @type {(inputs: Recipients_Showingrange1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Showing ${i?.from}-${i?.to} of ${i?.total}`)
};

export const recipients_previous = /** @type {(inputs: Recipients_PreviousInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous`)
};

export const recipients_next = /** @type {(inputs: Recipients_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

export const recipients_pageof1 = /** @type {(inputs: Recipients_Pageof1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Page ${i?.page} of ${i?.count}`)
};

export const recipients_selectallonpage3 = /** @type {(inputs: Recipients_Selectallonpage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select all recipients on this page`)
};

export const recipients_name = /** @type {(inputs: Recipients_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Name`)
};

export const recipients_email = /** @type {(inputs: Recipients_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

export const recipients_phone = /** @type {(inputs: Recipients_PhoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Phone`)
};

export const recipients_importbatch1 = /** @type {(inputs: Recipients_Importbatch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import batch`)
};

export const recipients_imported = /** @type {(inputs: Recipients_ImportedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Imported`)
};

export const recipients_selectrecipient1 = /** @type {(inputs: Recipients_Selectrecipient1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select ${i?.name}`)
};

export const recipients_noemailaddress2 = /** @type {(inputs: Recipients_Noemailaddress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No email address`)
};

export const recipients_customfields1 = /** @type {(inputs: Recipients_Customfields1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Custom fields`)
};

export const recipients_nocustomfields2 = /** @type {(inputs: Recipients_Nocustomfields2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No custom fields.`)
};

export const recipients_deletedescription1 = /** @type {(inputs: Recipients_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They will be removed from the directory. Past job history is kept.`)
};

export const recipients_countindirectoryone3 = /** @type {(inputs: Recipients_Countindirectoryone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipient in the directory`)
};

export const recipients_countindirectoryother3 = /** @type {(inputs: Recipients_Countindirectoryother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients in the directory`)
};

export const recipients_deletedcountone2 = /** @type {(inputs: Recipients_Deletedcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Deleted ${i?.count} recipient.`)
};

export const recipients_deletedcountother2 = /** @type {(inputs: Recipients_Deletedcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Deleted ${i?.count} recipients.`)
};

export const recipients_deletetitleone2 = /** @type {(inputs: Recipients_Deletetitleone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete ${i?.count} recipient?`)
};

export const recipients_deletetitleother2 = /** @type {(inputs: Recipients_Deletetitleother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete ${i?.count} recipients?`)
};

export const logs_title = /** @type {(inputs: Logs_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logs`)
};

export const logs_description = /** @type {(inputs: Logs_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every send job, most recent first - open one for the per-recipient detail.`)
};

export const logs_filterbystatus2 = /** @type {(inputs: Logs_Filterbystatus2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter by status`)
};

export const logs_allstatuses1 = /** @type {(inputs: Logs_Allstatuses1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All statuses`)
};

export const logs_from = /** @type {(inputs: Logs_FromInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`From`)
};

export const logs_to = /** @type {(inputs: Logs_ToInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`To`)
};

export const logs_jobscreatedfrom2 = /** @type {(inputs: Logs_Jobscreatedfrom2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jobs created from`)
};

export const logs_jobscreatedupto3 = /** @type {(inputs: Logs_Jobscreatedupto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jobs created up to`)
};

export const logs_couldnotload2 = /** @type {(inputs: Logs_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load the logs.`)
};

export const logs_loadinglogs1 = /** @type {(inputs: Logs_Loadinglogs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading logs…`)
};

export const logs_nojobsmatchfilters3 = /** @type {(inputs: Logs_Nojobsmatchfilters3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No jobs match your filters`)
};

export const logs_nojobshint2 = /** @type {(inputs: Logs_Nojobshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try a different status or date range.`)
};

export const logs_nosendjobsyet3 = /** @type {(inputs: Logs_Nosendjobsyet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No send jobs yet`)
};

export const logs_nosendjobshint3 = /** @type {(inputs: Logs_Nosendjobshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send a campaign from the compose wizard and it will appear here.`)
};

export const logs_status = /** @type {(inputs: Logs_StatusInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

export const logs_subject = /** @type {(inputs: Logs_SubjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subject`)
};

export const logs_template = /** @type {(inputs: Logs_TemplateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

export const logs_sentfailedskipped2 = /** @type {(inputs: Logs_Sentfailedskipped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sent / Failed / Skipped`)
};

export const logs_started = /** @type {(inputs: Logs_StartedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Started`)
};

export const logs_duration = /** @type {(inputs: Logs_DurationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Duration`)
};

export const logs_pausedprogress1 = /** @type {(inputs: Logs_Pausedprogress1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Paused - ${i?.sent} of ${i?.total} sent`)
};

export const logs_resuming = /** @type {(inputs: Logs_ResumingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resuming…`)
};

export const jobdetail_alllogs2 = /** @type {(inputs: Jobdetail_Alllogs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All logs`)
};

export const jobdetail_jobdetail2 = /** @type {(inputs: Jobdetail_Jobdetail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Job detail`)
};

export const jobdetail_counts1 = /** @type {(inputs: Jobdetail_Counts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent · ${i?.failed} failed · ${i?.skipped} skipped`)
};

export const jobdetail_resume1 = /** @type {(inputs: Jobdetail_Resume1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resume`)
};

export const jobdetail_retryallfailures3 = /** @type {(inputs: Jobdetail_Retryallfailures3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry All Failures (${i?.count})`)
};

export const jobdetail_template1 = /** @type {(inputs: Jobdetail_Template1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

export const jobdetail_smtp1 = /** @type {(inputs: Jobdetail_Smtp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP`)
};

export const jobdetail_sender1 = /** @type {(inputs: Jobdetail_Sender1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender`)
};

export const jobdetail_startedduration2 = /** @type {(inputs: Jobdetail_Startedduration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Started / Duration`)
};

export const jobdetail_deletedprofile2 = /** @type {(inputs: Jobdetail_Deletedprofile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(deleted profile)`)
};

export const jobdetail_inline1 = /** @type {(inputs: Jobdetail_Inline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(inline)`)
};

export const jobdetail_recipient1 = /** @type {(inputs: Jobdetail_Recipient1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient`)
};

export const jobdetail_noemailaddress3 = /** @type {(inputs: Jobdetail_Noemailaddress3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No email address`)
};

export const jobdetail_error1 = /** @type {(inputs: Jobdetail_Error1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error`)
};

export const jobdetail_sentat2 = /** @type {(inputs: Jobdetail_Sentat2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sent at`)
};

export const jobdetail_messageid2 = /** @type {(inputs: Jobdetail_Messageid2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message ID`)
};

export const jobdetail_retry1 = /** @type {(inputs: Jobdetail_Retry1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry`)
};

export const jobdetail_searchplaceholder2 = /** @type {(inputs: Jobdetail_Searchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipient name or email…`)
};

export const jobdetail_searcharia2 = /** @type {(inputs: Jobdetail_Searcharia2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipients of this job`)
};

export const jobdetail_filterbystatus3 = /** @type {(inputs: Jobdetail_Filterbystatus3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter recipients by status`)
};

export const jobdetail_loadingjob2 = /** @type {(inputs: Jobdetail_Loadingjob2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading job…`)
};

export const jobdetail_couldnotload3 = /** @type {(inputs: Jobdetail_Couldnotload3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load this job.`)
};

export const jobdetail_jobnotfound3 = /** @type {(inputs: Jobdetail_Jobnotfound3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Job not found`)
};

export const jobdetail_jobnotfoundhint4 = /** @type {(inputs: Jobdetail_Jobnotfoundhint4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`It may have been removed from the database.`)
};

export const jobdetail_backtologs3 = /** @type {(inputs: Jobdetail_Backtologs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to Logs`)
};

export const jobdetail_nomatchsearch3 = /** @type {(inputs: Jobdetail_Nomatchsearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients match your search`)
};

export const jobdetail_nomatchhint3 = /** @type {(inputs: Jobdetail_Nomatchhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try a different name, email, or status.`)
};

export const jobdetail_status1 = /** @type {(inputs: Jobdetail_Status1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

export const sendjob_selectrecipients2 = /** @type {(inputs: Sendjob_Selectrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select at least one recipient to send to.`)
};

export const sendjob_writesubject2 = /** @type {(inputs: Sendjob_Writesubject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write a subject.`)
};

export const sendjob_writebody2 = /** @type {(inputs: Sendjob_Writebody2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write an email body.`)
};

export const sendjob_entersender2 = /** @type {(inputs: Sendjob_Entersender2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter the sender name and address.`)
};

export const sendjob_chooseoneidentity3 = /** @type {(inputs: Sendjob_Chooseoneidentity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose either a saved SMTP profile or enter connection details, not both.`)
};

export const sendjob_norecipientsexist3 = /** @type {(inputs: Sendjob_Norecipientsexist3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None of the selected recipients still exist.`)
};

export const sendjob_alreadysending2 = /** @type {(inputs: Sendjob_Alreadysending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This job is already sending.`)
};

export const sendjob_anothersendactive3 = /** @type {(inputs: Sendjob_Anothersendactive3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Another send is in progress or paused. Pause or finish it first.`)
};

export const sendjob_stillpausing2 = /** @type {(inputs: Sendjob_Stillpausing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This job is still pausing - try again in a moment.`)
};

export const sendjob_onlysendingcanpause4 = /** @type {(inputs: Sendjob_Onlysendingcanpause4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only a sending job can be paused.`)
};

export const sendjob_onlypausedcanresume4 = /** @type {(inputs: Sendjob_Onlypausedcanresume4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only a paused job can be resumed.`)
};

export const sendjob_finishedcannotcancel3 = /** @type {(inputs: Sendjob_Finishedcannotcancel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This job already finished; it cannot be cancelled.`)
};

export const sendjob_onlyfinishedcanretry4 = /** @type {(inputs: Sendjob_Onlyfinishedcanretry4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only a finished job can be retried.`)
};

export const sendjob_nofailedrecipients3 = /** @type {(inputs: Sendjob_Nofailedrecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No failed recipients to retry.`)
};

export const sendjob_noconfirmedattachments3 = /** @type {(inputs: Sendjob_Noconfirmedattachments3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None of the recipients has a confirmed generated attachment. Generate the PDFs first.`)
};

export const sendjob_attachmentsmissingondisk4 = /** @type {(inputs: Sendjob_Attachmentsmissingondisk4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The generated attachment files no longer exist on disk. Generate the PDFs again.`)
};

export const sendjob_recipientdeleted2 = /** @type {(inputs: Sendjob_Recipientdeleted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient no longer exists in the database.`)
};

export const sendjob_recipientnoemail3 = /** @type {(inputs: Sendjob_Recipientnoemail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This recipient has no email address.`)
};

export const sendjob_noattachmentforrecipient4 = /** @type {(inputs: Sendjob_Noattachmentforrecipient4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No confirmed generated attachment for this recipient.`)
};

export const sendjob_retriesexhausted2 = /** @type {(inputs: Sendjob_Retriesexhausted2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retries exhausted: ${i?.message}`)
};

export const sendjob_couldnotresumejob4 = /** @type {(inputs: Sendjob_Couldnotresumejob4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not resume this job.`)
};

export const generatejob_templatemissing2 = /** @type {(inputs: Generatejob_Templatemissing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The template no longer exists.`)
};

export const generatejob_templatefilemissing3 = /** @type {(inputs: Generatejob_Templatefilemissing3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The template file is missing: "${i?.path}". It may have been moved or deleted.`)
};

export const generatejob_libreofficemissing3 = /** @type {(inputs: Generatejob_Libreofficemissing3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice is not installed, so DOCX letters cannot be converted to PDF.`)
};

export const generatejob_recipientdeleted2 = /** @type {(inputs: Generatejob_Recipientdeleted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient no longer exists in the database.`)
};

export const generatejob_missingslotdata3 = /** @type {(inputs: Generatejob_Missingslotdata3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Missing data for slot "${i?.slot}".`)
};

export const generatejob_couldnotfill3 = /** @type {(inputs: Generatejob_Couldnotfill3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not fill the letter: ${i?.message}`)
};

export const generatejob_nopdfproduced3 = /** @type {(inputs: Generatejob_Nopdfproduced3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice produced no PDF for this letter.`)
};

export const generatejob_selectrecipients2 = /** @type {(inputs: Generatejob_Selectrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select at least one recipient.`)
};

export const generatejob_norecipientsexist3 = /** @type {(inputs: Generatejob_Norecipientsexist3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None of the selected recipients still exist.`)
};

export const generatejob_jobcouldnotbecreated5 = /** @type {(inputs: Generatejob_Jobcouldnotbecreated5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The job could not be created.`)
};

export const generatejob_nofreefilename4 = /** @type {(inputs: Generatejob_Nofreefilename4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not find a free file name for "${i?.name}".`)
};

export const templatesservice_docxonly2 = /** @type {(inputs: Templatesservice_Docxonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slot scanning works on .docx files only.`)
};

export const templatesservice_couldnotread3 = /** @type {(inputs: Templatesservice_Couldnotread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not read "${i?.path}": ${i?.detail}`)
};

export const importservice_nonamecolumn3 = /** @type {(inputs: Importservice_Nonamecolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recognizable name column was found. Select it in the mapping below.`)
};

export const importservice_noemailcolumn3 = /** @type {(inputs: Importservice_Noemailcolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recognizable email column was found. Select it in the mapping below.`)
};

export const importservice_notexcel2 = /** @type {(inputs: Importservice_Notexcel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not an Excel file (.xlsx or .xls expected)`)
};

export const importservice_duplicateheaders2 = /** @type {(inputs: Importservice_Duplicateheaders2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Column headers ${i?.headers} appear more than once after trimming - only the first occurrence is imported.`)
};

export const importservice_rowsskippedemptyname4 = /** @type {(inputs: Importservice_Rowsskippedemptyname4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} row(s) skipped because the name is empty.`)
};

export const validation_smtpnamerequired2 = /** @type {(inputs: Validation_Smtpnamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile name is required.`)
};

export const validation_smtphostrequired2 = /** @type {(inputs: Validation_Smtphostrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP host is required.`)
};

export const validation_smtpportinvalid2 = /** @type {(inputs: Validation_Smtpportinvalid2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port must be a whole number between 1 and 65535.`)
};

export const validation_smtpusernamerequired2 = /** @type {(inputs: Validation_Smtpusernamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username is required.`)
};

export const validation_smtppasswordrequired2 = /** @type {(inputs: Validation_Smtppasswordrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App password is required.`)
};

export const validation_templatenamerequired2 = /** @type {(inputs: Validation_Templatenamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template name is required.`)
};

export const validation_templateneedsslot2 = /** @type {(inputs: Validation_Templateneedsslot2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A template needs at least one slot.`)
};

export const validation_templatepatternneedsslot3 = /** @type {(inputs: Validation_Templatepatternneedsslot3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The output pattern must reference at least one slot, e.g. "LOA_${i?.name}.pdf".`)
};

export const validation_templatepatternunknownslot3 = /** @type {(inputs: Validation_Templatepatternunknownslot3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The output pattern references "${i?.slot}", which is not one of the template's slots.`)
};

export const dialogs_excelfilter1 = /** @type {(inputs: Dialogs_Excelfilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Excel`)
};

export const dialogs_templatefilter1 = /** @type {(inputs: Dialogs_Templatefilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};